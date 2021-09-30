package com.app.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.Email_UUID_dto;
import com.app.dto.LibraryName_SerialNo_dto;
import com.app.pojos.Library;
import com.app.pojos.User;

public interface LibraryRepository extends JpaRepository<Library,Integer>{
	Optional<Library> findByEmail(String email);
	Optional<Library> findByEmailAndPwd(String email,String pwd);
	Optional<Library> findByEmailAndSerialNo(String email,UUID serialNo);
	Optional<Library> findBySerialNo(UUID serialNo);
	Optional<Library> findByLibraryName(String libraryName);
	Optional<Library> findByPhone(String phone);
	@Query(value="select new com.app.dto.LibraryName_SerialNo_dto (t.libraryName,t.serialNo) from Library t")
	List<LibraryName_SerialNo_dto> getLibraryNamesAndSerialNo();
}
