package com.app.dto;

import java.util.UUID;

import javax.persistence.Column;

public class LibraryName_SerialNo_dto {
	private String libraryName;	
	private UUID serialNo;
	public LibraryName_SerialNo_dto() {
		System.out.println("in constructor of "+getClass().getName());
	}
	
	
	
	public LibraryName_SerialNo_dto(String libraryName, UUID serialNo) {
		super();
		this.libraryName = libraryName;
		this.serialNo = serialNo;
	}



	public String getLibraryName() {
		return libraryName;
	}
	public void setLibraryName(String libraryName) {
		this.libraryName = libraryName;
	}
	public UUID getSerialNo() {
		return serialNo;
	}
	public void setSerialNo(UUID serialNo) {
		this.serialNo = serialNo;
	}
	
	

}
