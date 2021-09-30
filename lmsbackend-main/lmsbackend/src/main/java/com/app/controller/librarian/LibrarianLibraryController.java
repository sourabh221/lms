package com.app.controller.librarian;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookDto;
import com.app.dto.LibraryName_SerialNo_dto;
import com.app.dto.ResultDto;
import com.app.pojos.Library;

import com.app.pojos.ReserveBookHistory;
import com.app.pojos.User;
import com.app.service.LibraryServiceImpl;
import com.app.utils.UserUtils;

@RestController
@CrossOrigin("http://localhost:3050")
@RequestMapping("/librarian/library")
public class LibrarianLibraryController {

	@Autowired
	 LibraryServiceImpl libraryServiceImpl;
	

	
	public LibrarianLibraryController() {
		System.out.println("in constructor of"+getClass().getName());
	}

	
	@GetMapping("/get-librarys")
	public ResponseEntity<?> getLibrarys(){
		System.out.println("in getLibrarys method of "+getClass().getName());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			List<LibraryName_SerialNo_dto> object=libraryServiceImpl.GetLibrarysNameAndSerialNo();
			if(object!=null) {
				result.setStatus("success");
				result.setData(object);
			}
		} catch (Exception e) {
			result.setData(e.getMessage());
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	

}
