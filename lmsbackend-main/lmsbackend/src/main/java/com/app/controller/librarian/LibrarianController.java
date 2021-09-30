package com.app.controller.librarian;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.util.List;
import java.util.UUID;

import javax.mail.internet.MimeMessage;
import javax.sql.rowset.serial.SerialBlob;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.EmailReceiverDto;
import com.app.dto.Email_UUID_dto;
import com.app.dto.LibraryDto;
import com.app.dto.LibraryName_SerialNo_dto;
import com.app.dto.ResultDto;
import com.app.dto.userDto;
import com.app.pojos.Address;
import com.app.pojos.Library;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.service.LibraryServiceImpl;
import com.app.service.UserServiceImpl;
import com.app.utils.UserUtils;

@RestController
@CrossOrigin("http://localhost:3050")
@RequestMapping("/librarian")
public class LibrarianController {

String location = "E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\Librarian";
	
	@Autowired
	UserServiceImpl userServiceImpl;
	
	@Autowired
	LibraryServiceImpl libraryServiceImpl;
	
	@Autowired
	private JavaMailSender emailSender;
	
	int otp;

	
	public LibrarianController() {
		System.out.println("in constructor of"+getClass().getName());
	}
	
	
	
	@PostMapping("/signup")
	public ResponseEntity<?> addLibrarian(@RequestHeader UUID id,@RequestBody userDto uDto){
		System.out.println("in addLibrarian method of "+getClass().getName());
		System.out.println("id is "+id);
		
		
		ResultDto result=new ResultDto("error","something went wrong");
		
		 try {
			User user=userServiceImpl.getUserByEmail(uDto.getEmail());
			if(user==null) {
				User user1=userServiceImpl.getUserByPhone(uDto.getphone());
				if(user1==null) {
					Address addr = new Address(uDto.getBuildingName(), uDto.getColonyName(), uDto.getCity(), uDto.getState(),
							uDto.getPincode());
					User u = new User(uDto.getFirstName(), uDto.getLastName(),uDto.getphone(), uDto.getEmail(), uDto.getPwd(),
							uDto.getBirthDate());
					u.addAddress(addr);
					u.setRole(Role.LIBRARIAN);
					u.setEmail(true);
					Library lib=libraryServiceImpl.GetLibraryBySerialNo(id);
					if(lib!=null) {
						lib.addUser(u);
						lib=libraryServiceImpl.AddLibrary(lib);
						if(lib!=null) {
							User u1=lib.getUsers().get(uDto.getEmail());
							result.setStatus("success");
							result.setData(u1);
						}else {
							result.setData("something went wrong while fetching the librarys");
						}
					}
					
				
				}else {
					result.setData("mobile no already registered please enter the another mobile no");
				}
			}else {
				result.setData("email already registered please enter the another email");
			}
		} catch (Exception e) {
			result.setData(e.getMessage());
			return ResponseEntity.ok(result);
		}
		
		
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody userDto user) {
		System.out.println("in login function of "+getClass().getName()+" "+user.getEmail());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			User user1=userServiceImpl.getUserByEmail(user.getEmail());
			if(user1!=null) {
				User u=userServiceImpl.getUserByEmailAndPwd(user.getEmail(),user.getPwd());
				if(u!=null) {
					if(u.getRole().compareTo(Role.LIBRARIAN)==0) {
						if(u.getIsActive()) {
							result.setStatus("success");
							result.setData(u);
						}else {
							result.setData("u r account is not activated please wait till activation");
						}
					}else {
						result.setData("u r not authorized to login");
					}
				}else {
					result.setData("please enter the valid password ");
				}
			}else {
				result.setData("please enter the valid email address");
			}
			
			
		} catch (Exception e) {
			result.setData(e.getMessage());
			return ResponseEntity.ok(result);
		}
			
			
		return ResponseEntity.ok(result);
	}
	
	
	@PostMapping("/image-upload")
	public ResponseEntity<?> imageUpload(@RequestHeader UUID id, @RequestBody MultipartFile file) throws Exception {

		System.out.println("in image uploading function of " + getClass().getName());
		ResultDto result=new ResultDto("error","something went wrong while uploading image");
		try {
			System.out.println("file name "+file.getOriginalFilename());
			String fileName=file.getOriginalFilename();
			Path path = Paths.get(location, file.getOriginalFilename());
			
			File temp=new File(path.toString());
			System.out.println(temp.exists());
			while(temp.exists() ) {
				String name=file.getOriginalFilename();
				int index=name.indexOf('.');
				int max=10000,min=99999;
				int b = (int)(Math.random()*(max-min+1)+min);  
				int c = (int)(Math.random()*(max-min+1)+min);  
				 fileName=name.substring(0,index)+b+c+name.substring(index);
				 System.out.println("filename "+fileName);
				path = Paths.get(location, fileName);
				temp=new File(path.toString());
			}
			User u=userServiceImpl.uploadPhoto(id, fileName);
			if(u!=null) {
				file.transferTo(new File(location, u.getUserImage()));
				result.setData("image uploaded successfully");
				result.setStatus("success");
			}
		} catch (Exception e) {
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	@PutMapping("/image-download")
	public ResponseEntity<?> imageDownload(@RequestBody Email_UUID_dto email_UUID_dto) throws Exception {
		ResultDto result=new ResultDto("error","something went wrong");
		System.out.println("in image downloading function of " +getClass().getName()+" "+email_UUID_dto.getEmail());
		try {
			User u = userServiceImpl.getUserBySerialNo(email_UUID_dto.getSerialNo());
			if (u != null ) {
				Path  path;
				if(u.getUserImage() != null) {
					path = Paths.get(location, u.getUserImage());
				}else {
					 path = Paths.get(location, "user_dummy.png");
				}
				
				Blob blob = UserUtils.GetImage(location, u.getUserImage(), "user_dummy.png");
				HttpHeaders headers = new HttpHeaders();
				headers.add("content-type", Files.probeContentType(path));
				return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, "image/*").body(blob);
			}else {
				result.setData("error:wrong librarian id");
			}
		} catch (Exception e) {
			result.setData("error:"+e.getMessage());
			System.out.println("exception in imageDownload  of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}



	@PostMapping("/get-profile")
	public ResponseEntity<?> getProfile(@RequestBody Email_UUID_dto email_UUID_dto) {
		System.out.println("in getProfile function of "+getClass().getName()+" "+email_UUID_dto.getSerialNo());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			User u=userServiceImpl.getUserBySerialNo(email_UUID_dto.getSerialNo());
			if(u!=null) {
				result.setStatus("success");
				result.setData(u);
			}
			
			
		} catch (Exception e) {
			result.setData(e.getMessage());
			System.out.println("exception in getProfile  of "+getClass().getName());
			System.out.println(e.getMessage());
			return ResponseEntity.ok(result);
		}
			
			
		return ResponseEntity.ok(result);
	}
	@PutMapping("/send-otp")
	public ResponseEntity<?> sendOtpViaEmail(@RequestBody EmailReceiverDto email)  {
		System.out.println("in send otp function of " + getClass().getName());
		ResultDto result=new ResultDto("error","user not found");
		try {
			String e=email.getEmail();
			String pathToAttachment = "E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Template\\forget_password1.html";
			File file = new File(pathToAttachment);
			if(e!=null) {
				BufferedReader reader = new BufferedReader(new FileReader(file));
				String line = reader.readLine();
				String content = "";
				while (line != null) {
					content = content + line + System.lineSeparator();

					line = reader.readLine();
				}
				reader.close();
				otp=UserUtils.generateOTP();
				System.out.println("otp  ="+otp);
				content = content.replaceFirst("Otp",String.valueOf(otp));
				MimeMessage message = emailSender.createMimeMessage();

				MimeMessageHelper helper = new MimeMessageHelper(message, true);

				helper.setFrom("sourabhthote22@gmail.com");
				helper.setTo(e);
				helper.setSubject("authentication mail");
				helper.setText(content, true);
				helper.addInline("welcomeImage",
						new File("E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Template\\welcome.jpg"));



				emailSender.send(message);
				System.out.println("message send successfully");
				
				result.setStatus("success");
				result.setData(otp);
				return ResponseEntity.ok(result);
			}
		} catch (Exception e) {
			result.setStatus("error");
			result.setData(e.getMessage());
			return ResponseEntity.ok(result);
		} 
		result.setStatus("error");
		result.setData("email not received something went wrong");
		return ResponseEntity.ok(result);
	}
	
	
	@PutMapping("/update-password")
	public ResponseEntity<?> updatePassword(@RequestBody userDto uDto){
		System.out.println("in update password  of  "+getClass().getName()+" "+uDto.getEmail()+" "+uDto.getPwd());
		ResultDto result=new ResultDto("error","user not found associate with email");
		try {
			User u=userServiceImpl.getUserByEmail(uDto.getEmail());
			if(u!=null) {
				User u2=userServiceImpl.updateUserPwd(uDto.getEmail(), uDto.getPwd());
				if(u2!=null) {
					result.setStatus("success");
					result.setData("password update successfully now please sign in");
				}
			}else {
				result.setData("wrong email id");
			}
		} catch (Exception e) {
			result.setData(e.getMessage());
			System.out.println("exception in updatePassword  of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}

	
	@PutMapping("/update-profile")
	public ResponseEntity<?> updateUserProfile(@RequestBody userDto uDto){
		System.out.println("in update password  of  "+getClass().getName()+" "+uDto.getEmail()+" "+uDto.getPwd());
		ResultDto result=new ResultDto("error","user not found associate with email");
		try {
		User u=userServiceImpl.getUserByEmail(uDto.getEmail());
		if(u!=null) {
			u.setPhone(uDto.getphone());
			u.getAddr().setBuildingName(uDto.getBuildingName());
			u.getAddr().setColonyName(uDto.getColonyName());
			u.getAddr().setCity(uDto.getCity());
			u.getAddr().setPincode(uDto.getPincode());
			u.getAddr().setState(uDto.getState());
			User u1=userServiceImpl.addUser(u);
			if(u1!=null) {
				result.setData(u1);
				result.setStatus("success");
				
			}else {
				result.setData("something went wrong while updating");
			}
			
		}else {
			result.setData("user not found");
		}
		} catch (Exception e) {
			result.setData(e.getMessage());
			System.out.println("exception in updateUserProfile  of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}


}
