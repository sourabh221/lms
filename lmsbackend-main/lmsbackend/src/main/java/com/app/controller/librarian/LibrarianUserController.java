package com.app.controller.librarian;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Email_UUID_dto;
import com.app.dto.ResultDto;
import com.app.pojos.Library;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.service.LibraryServiceImpl;
import com.app.service.UserServiceImpl;
import com.app.utils.UserUtils;


@RestController
@CrossOrigin("http://localhost:3050")
@RequestMapping("/library/user")
public class LibrarianUserController {

	@Autowired
	LibraryServiceImpl libraryServiceImpl;
	
	@Autowired
	UserServiceImpl userServiceImpl;
	
	String location = "E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\User";

	public LibrarianUserController() {
		System.out.println("in constructor of"+getClass().getName());
	}
	
	
	@GetMapping("/get-users")
	public ResponseEntity<?> getUsers(@RequestHeader UUID id){
		System.out.println("in the method getUsers of "+getClass().getName()+" "+id);
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			Library lib=libraryServiceImpl.GetLibraryBySerialNo(id);
			if(lib!=null) {
				List<User>librarians=new ArrayList<User>();
				
				for (Map.Entry<String, User> entry : lib.getUsers().entrySet()) {
					System.out.println(entry.getValue());
					if(entry.getValue().getRole().compareTo(Role.USER)==0) {
						librarians.add(entry.getValue());
						
					}
				}
				System.out.println(lib.getUsers());
				result.setData(librarians);
				result.setStatus("success");
			}else {
				result.setData("library is not found");
			}
		} catch (Exception e) {
			System.out.println("exception in getUsers of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	@PutMapping("/activate-user")
	public ResponseEntity<?> ToggleActivationOfUser(@RequestHeader UUID id,@RequestBody Email_UUID_dto email_UUID_dto){
		System.out.println("in the method ToggleActivationOfUser of "+getClass().getName()+" "+id);
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			Library lib=libraryServiceImpl.GetLibraryBySerialNo(id);
			if(lib!=null) {
				User librarian=userServiceImpl.updateActivationOfUser(email_UUID_dto.getSerialNo());
				if(librarian!=null) {
					result.setData(librarian);
					result.setStatus("success");
				}
			}else {
				result.setData("library is not found");
			}
			
		} catch (Exception e) {
			System.out.println("exception in ToggleActivationOfUser of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	

	@PutMapping("/image-download")
	public ResponseEntity<?> imageDownload(@RequestHeader UUID id,@RequestBody Email_UUID_dto email_UUID_dto) throws Exception {
		ResultDto result=new ResultDto("error","something went wrong");
		System.out.println("in image downloading function of " + id);
		try {
			Library lib=libraryServiceImpl.GetLibraryBySerialNo(id);
			if(lib!=null) {
				User u = userServiceImpl.getUserBySerialNo(email_UUID_dto.getSerialNo());
				if (u != null ) {
					Path  path;
					if(u.getUserImage() != null) {
						path = Paths.get(location, u.getUserImage());
					}else {
						 path = Paths.get(location, "user_dummy.png");
					}
					
					
					Blob blob = UserUtils.GetImage(location, u.getUserImage(),"user_dummy.png" );
					HttpHeaders headers = new HttpHeaders();
					headers.add("content-type", Files.probeContentType(path));
					return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, "image/*").body(blob);
				}else {
					result.setData("error:wrong librarian id");
				}
			}else {
				result.setData("error:wrong library id");
			}
		} catch (Exception e) {
			result.setData("error:"+e.getMessage());
			
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.ok(result);
	}

	
}
