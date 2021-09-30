package com.app.dto;

import java.util.UUID;

public class Email_UUID_dto {
private String email;
private UUID  serialNo;



public Email_UUID_dto() {
	System.out.println("in ctor of "+getClass().getName());
}

public Email_UUID_dto(String email, UUID sersialNo) {
	super();
	System.out.println("in ctor of "+getClass().getName());
	this.email = email;
	this.serialNo = sersialNo;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public UUID getSerialNo() {
	return serialNo;
}

public void setSerialNo(UUID sersialNo) {
	this.serialNo = sersialNo;
}

@Override
public String toString() {
	return "Email_UUID_dto [email=" + email + ", sersialNo=" + serialNo + "]";
}



}
