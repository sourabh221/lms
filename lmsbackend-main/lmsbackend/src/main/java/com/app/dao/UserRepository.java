package com.app.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Library;
import com.app.pojos.Role;
import com.app.pojos.User;

public interface UserRepository extends JpaRepository<User,Integer> {
	Optional<User> findByEmailAndPwd(String email,String pwd);
	Optional<User> findByEmailAndSerialNo(String email,UUID serialNo);
	Optional<List<User>> findByLibraryAndRole(Library lib,Role role);
	Optional<User> findBySerialNo(UUID serialNo);
	Optional<User> findByEmail(String email);
	Optional<User> findByPhone(String phone);
}
