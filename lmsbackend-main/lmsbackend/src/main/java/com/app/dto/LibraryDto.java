package com.app.dto;

import java.util.UUID;

import javax.persistence.Column;

public class LibraryDto {
	private String libraryName;

	private String email;

	private String phone;

	private String pwd;
	
	private String buildingName;

	private String colonyName;

	private String city;

	private String state;

	private String pincode;
	
	private UUID serialNo;

	

	public LibraryDto() {
		System.out.println("in ctor of " + getClass().getName());
	}

	

	public String getBuildingName() {
		return buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}



	public UUID getSerialNo() {
		return serialNo;
	}



	public void setSerialNo(UUID serialNo) {
		this.serialNo = serialNo;
	}



	public String getLibraryName() {
		return libraryName;
	}



	public void setLibraryName(String libraryName) {
		this.libraryName = libraryName;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getPhone() {
		return phone;
	}



	public void setPhone(String phone) {
		this.phone = phone;
	}



	public String getPwd() {
		return pwd;
	}



	public void setPwd(String pwd) {
		this.pwd = pwd;
	}



	public String getColonyName() {
		return colonyName;
	}



	public void setColonyName(String colonyName) {
		this.colonyName = colonyName;
	}



	public String getCity() {
		return city;
	}



	public void setCity(String city) {
		this.city = city;
	}



	public String getState() {
		return state;
	}



	public void setState(String state) {
		this.state = state;
	}



	public String getPincode() {
		return pincode;
	}



	public void setPincode(String pincode) {
		this.pincode = pincode;
	}



	@Override
	public String toString() {
		return "LibraryDto [libraryName=" + libraryName + ", email=" + email + ", phone=" + phone + ", pwd=" + pwd
				+ ", colonyName=" + colonyName + ", city=" + city + ", state=" + state + ", pincode=" + pincode + "]";
	}
	
	

}
