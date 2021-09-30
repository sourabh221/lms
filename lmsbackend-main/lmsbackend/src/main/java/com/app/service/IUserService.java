package com.app.service;

import java.sql.Blob;
import java.util.List;
import java.util.UUID;

import com.app.dto.Email_UUID_dto;
import com.app.dto.LibraryName_SerialNo_dto;
import com.app.pojos.User;

public interface IUserService {
	User addUser(User u);
	User getUserById(int id);
	User getUserBySerialNo(UUID serialNo);
	User getUserByEmailAndPwd(String email,String pwd);
	User getUserByEmail(String email);
	User getUserByPhone(String phone);
    User updateActivationOfUser(UUID serialNo);
    User uploadPhoto(UUID id,String fileName);
    User updateUserPwd(String email,String pwd);
}
