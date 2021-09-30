package com.app.controller.library;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.EmailReceiverDto;
import com.app.dto.Email_UUID_dto;
import com.app.dto.LibraryDto;
import com.app.dto.ResultDto;
import com.app.dto.userDto;
import com.app.pojos.Address;
import com.app.pojos.Library;
import com.app.pojos.LibraryAddress;
import com.app.pojos.User;
import com.app.service.LibraryServiceImpl;
import com.app.utils.UserUtils;


@RestController
@CrossOrigin("http://localhost:3040")
@RequestMapping("/library")
public class LibraryController {
	
	@Autowired
	public LibraryServiceImpl libraryServiceImpl;
	
	@Autowired
	private JavaMailSender emailSender;
	
	int otp;

	public LibraryController() {
		super();
		System.out.println("in ctor of " + getClass().getName());
	}

	@PostMapping("/signup")
	public ResponseEntity<?> addLibrary(@RequestBody LibraryDto lDto){
		System.out.println("in login function of "+getClass().getName()+" "+lDto.getEmail());
		System.out.println(lDto);
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			Library lib1=libraryServiceImpl.GetLibraryByLibraryName(lDto.getLibraryName());
			if(lib1==null) {
				Library lib2=libraryServiceImpl.GetLibraryByEmail(lDto.getEmail());
				if(lib2==null) {
					Library lib3=libraryServiceImpl.GetLibraryByPhone(lDto.getPhone());
					if(lib3==null) {
						Library lib=new Library(lDto.getLibraryName(),lDto.getEmail(),lDto.getPhone(),lDto.getPwd());
						LibraryAddress addr = new LibraryAddress(lDto.getBuildingName(), lDto.getColonyName(), lDto.getCity(), lDto.getState(),
								lDto.getPincode());
						lib.addAddress(addr);
						lib.setEmail(true);
						lib.setActive(true);
						lib=libraryServiceImpl.AddLibrary(lib);
						if(lib!=null) {
							result.setStatus("success");
							result.setData(lib);
						}
					}else {
						result.setData("phone no is already registered please enter another phone no");
					}
				}else {
					result.setData("email is already registered please enter another email");
				}
			}else {
				result.setData("library name already exists please reenter another library name");
			}
		} catch (Exception e) {
			result.setData(e.getMessage());
		}
		
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody LibraryDto library) {
		System.out.println("in login function of "+getClass().getName()+" "+library.getEmail());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			Library lib1=libraryServiceImpl.GetLibraryByEmail(library.getEmail());
			if(lib1!=null) {
				Library lib=libraryServiceImpl.GetLibraryByEmailAndPwd(library.getEmail(), library.getPwd());
				if(lib!=null) {
					if(lib.isActive()) {
						result.setStatus("success");
						result.setData(lib);
					}else {
						result.setData("sorry your account is not active please send mail to our official mail account");
					}
				}else {
					result.setData("invalid password please enter the valid password");
				}
				
			}else {
				result.setData("invalid email please enter the valid email");
			}
			
		} catch (Exception e) {
			result.setData(e.getMessage());
			return ResponseEntity.ok(result);
		}
			
			
		return ResponseEntity.ok(result);
	}
	
	@PutMapping("/get-library")
	public ResponseEntity<?> getUserByEmailAndSerialNo(@RequestBody Email_UUID_dto email_UUID_dto){
		System.out.println("in get user by email and serialNo function of "+getClass().getName()+" "+email_UUID_dto.getEmail());
		ResultDto result=new ResultDto("error","user not found");
		try {
			Library lib=libraryServiceImpl.GetLibraryByEmailAndSerialNo(email_UUID_dto.getEmail(),email_UUID_dto.getSerialNo());
			
			if(lib!=null) {
				System.out.println("success");
				result.setStatus("success");
				result.setData(lib);
			}
		} catch (Exception e) {
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	

	@PutMapping("/get-library-by-email")
	public ResponseEntity<?> getUserByEmailo(@RequestBody Email_UUID_dto email_UUID_dto){
		System.out.println("in get user by email and serialNo function of "+getClass().getName()+" "+email_UUID_dto.getEmail());
		ResultDto result=new ResultDto("error","user not found");
		try {
			Library lib=libraryServiceImpl.GetLibraryByEmail(email_UUID_dto.getEmail());
			
			if(lib!=null) {
				System.out.println("success");
				result.setStatus("success");
				result.setData(lib);
			}
		} catch (Exception e) {
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	@PutMapping("/update-profile")
	public ResponseEntity<?> updateProfile(@RequestBody LibraryDto libraryDto) throws Exception {
		System.out.println("in update profile of "+getClass().getName());
		ResultDto result=new ResultDto("error","user not found");
		try {
			LibraryAddress addr=new LibraryAddress(libraryDto.getBuildingName(),libraryDto.getColonyName(),libraryDto.getCity(),libraryDto.getState(),libraryDto.getPincode());
			Library lib=new Library();
			lib.setPhone(libraryDto.getPhone());
			lib.setEmail(libraryDto.getEmail());
			
			lib.setSerialNo(libraryDto.getSerialNo());
			lib=libraryServiceImpl.UpdateLibrary(lib, addr);
			if(lib!=null) {
				result.setStatus("success");
				result.setData(lib);
			}
		} catch (Exception e) {
			result.setData(e.getMessage());
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
	public ResponseEntity<?> updatePassword(@RequestBody LibraryDto lib){
		System.out.println("in update password  of "+lib.getEmail()+" "+lib.getPwd());
		ResultDto result=new ResultDto("error","user not found associate with email");
		try {
			Library lib1=libraryServiceImpl.GetLibraryByEmail(lib.getEmail());
			if(lib1!=null) {
				Library lib2=libraryServiceImpl.UpdateLibraryPwd(lib.getEmail(), lib.getPwd());
				if(lib2!=null) {
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

}
