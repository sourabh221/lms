package com.app.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.LibraryBookDetailsServiceImpl;

@RestController
@CrossOrigin("http://localhost:3060")
@RequestMapping("/user/home")
public class UserHomeController {

	@Autowired
	LibraryBookDetailsServiceImpl libraryBookDetailsServiceImpl;

	public UserHomeController() {
		System.out.println("in ctor of " + getClass().getName());
	}

}
