package com.app.service;

import java.sql.Blob;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.LibraryRepository;
import com.app.dao.UserRepository;
import com.app.dto.Email_UUID_dto;
import com.app.dto.LibraryName_SerialNo_dto;
import com.app.pojos.Library;
import com.app.pojos.Role;
import com.app.pojos.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	
	@Autowired
	private UserRepository userRepo;
	
	
	
	public UserServiceImpl() {
		System.out.println("in ctor of "+getClass().getName());
	}
	

	@Override
	public User addUser(User u) {
		System.out.println("in method of adding user of userservice "+u.getEmail());

		try {
			return userRepo.save(u);
		} catch ( Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@Override
	public User getUserById(int id) {
		System.out.println("in method of getuserById of userservice "+id);

		try {
			Optional<User> optional=userRepo.findById(id);
			if(optional.isPresent())
				return optional.get();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
		return null;
	}

	@Override
	public User getUserByEmailAndPwd(String email,String pwd) {
		System.out.println("in method of getuserByEmail of userservice "+email);
		try {
			Optional<User> optional=userRepo.findByEmailAndPwd(email,pwd);
			if(optional.isPresent())
				return optional.get();
		} catch (Exception e) {
			return null;
		}
		return null;
	}








	@Override
	public User updateActivationOfUser(UUID serialNo) {
		System.out.println("in method of updateActivationOfUser of userservice ");
		try {
		Optional<User> optional=userRepo.findBySerialNo(serialNo);
		if(optional.isPresent()) {
			User u=optional.get();
			if(u.getIsActive() ) {
				u.setActive(false);
			}else {
				u.setActive(true);
			}
			return userRepo.save(u);
		}
		} catch (Exception e) {
			System.out.println("in exception of updateActivationOfUser");
			System.out.println(e.getMessage());
		}
		return null;
	}


	@Override
	public User uploadPhoto(UUID id, String fileName) {
		System.out.println("in method of uploadPhoto of userservice ");
		try {
			Optional<User> optional=userRepo.findBySerialNo(id);
			if(optional.isPresent()) {
				User u=optional.get();
			    u.setUserImage(fileName);
				return userRepo.save(u);
			}
		} catch (Exception e) {
			System.out.println("in exception of uploadPhoto");
			System.out.println(e.getMessage());
		}
		return null;
	}


	@Override
	public User getUserBySerialNo(UUID serialNo) {
		System.out.println("in method of getUserBySerialNo of userservice "+serialNo);
		try {
			Optional<User> optional=userRepo.findBySerialNo(serialNo);
			if(optional.isPresent())
				return optional.get();
		} catch (Exception e) {
			System.out.println("in exception of getUserBySerialNo");
			System.out.println(e.getMessage());
		}
		return null;
	}


	@Override
	public User getUserByEmail(String email) {
		System.out.println("in method of getUserByEmail of userservice "+email);
		try {
			Optional<User> optional=userRepo.findByEmail(email);
			if(optional.isPresent())
				return optional.get();
		} catch (Exception e) {
			System.out.println("in exception of getUserByEmail");
			System.out.println(e.getMessage());
		}
		return null;
	}


	@Override
	public User getUserByPhone(String phone) {
		System.out.println("in method of getUserByPhone of userservice "+phone);
		try {
			Optional<User> optional=userRepo.findByPhone(phone);
			if(optional.isPresent())
				return optional.get();
		} catch (Exception e) {
			System.out.println("in exception of getUserByPhone");
			System.out.println(e.getMessage());
		}
		return null;
	}


	@Override
	public User updateUserPwd(String email, String pwd) {
		System.out.println("in method of updateUserPwd of userservice "+email);
		try {
			Optional<User> optional=userRepo.findByEmail(email);
			if(optional.isPresent()) {
				User u= optional.get();
				u.setPwd(pwd);
				return userRepo.save(u);
			}
				
		} catch (Exception e) {
			System.out.println("in exception of updateUserPwd");
			System.out.println(e.getMessage());
		}
		return null;
	}



}
