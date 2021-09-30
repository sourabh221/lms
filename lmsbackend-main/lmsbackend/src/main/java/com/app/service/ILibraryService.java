package com.app.service;

import java.util.List;
import java.util.UUID;

import com.app.dto.LibraryName_SerialNo_dto;
import com.app.pojos.Library;
import com.app.pojos.LibraryAddress;
import com.app.pojos.User;

public interface ILibraryService {
	Library AddLibrary(Library lib);
	Library GetLibraryByEmail(String email);
	Library GetLibraryByEmailAndPwd(String email,String pwd);
	Library GetLibraryByEmailAndSerialNo(String email, UUID serialNo);
	Library UpdateLibrary(Library lib,LibraryAddress address);
	Library GetLibraryBySerialNo(UUID serialNo);
	Library GetLibraryByLibraryName(String name);
	Library GetLibraryByPhone(String phone);
	Library UpdateLibraryPwd(String email,String pwd);
	List<LibraryName_SerialNo_dto> GetLibrarysNameAndSerialNo();
	
}
