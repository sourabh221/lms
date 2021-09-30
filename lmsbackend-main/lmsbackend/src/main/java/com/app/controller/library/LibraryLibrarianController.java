package com.app.controller.library;

import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.util.StreamUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Email_UUID_dto;
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
@CrossOrigin("http://localhost:3040")
@RequestMapping("/library/librarian")
public class LibraryLibrarianController {
	
	@Autowired
	LibraryServiceImpl libraryServiceImpl;
	
	@Autowired
	UserServiceImpl userServiceImpl;
	
	String location = "E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\Librarian";

	public LibraryLibrarianController() {
		System.out.println("in constructor of"+getClass().getName());
	}
	
	
	@GetMapping("/get-librarians")
	public ResponseEntity<?> getLibrarians(@RequestHeader UUID id){
		System.out.println("in the method getLibrarians of "+getClass().getName()+" "+id);
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			Library lib=libraryServiceImpl.GetLibraryBySerialNo(id);
			if(lib!=null) {
				List<User>librarians=new ArrayList<User>();
				for (Map.Entry<String, User> entry : lib.getUsers().entrySet()) {
					if(entry.getValue().getRole().compareTo(Role.LIBRARIAN)==0) {
						librarians.add(entry.getValue());
					}
				}
				result.setData(librarians);
				result.setStatus("success");
			}else {
				result.setData("library is not found");
			}
		} catch (Exception e) {
			System.out.println("exception in getLibrarians of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	@PutMapping("/activate-librarian")
	public ResponseEntity<?> ToggleActivationOfLibrarian(@RequestHeader UUID id,@RequestBody Email_UUID_dto email_UUID_dto){
		System.out.println("in the method ToggleActivationOfLibrarian of "+getClass().getName()+" "+id);
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
			System.out.println("exception in ToggleActivationOfLibrarian of "+getClass().getName());
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
