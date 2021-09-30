package com.app.dto;

import java.time.LocalDate;

public class userDto {
	private String firstName;

	private String lastName;

	
	private String email;

	private String pwd;
	private LocalDate birthDate;
	private String buildingName;

	private String colonyName;

	private String city;

	private String state;

	private String pincode;

	private String phone;

	public userDto() {
		System.out.println("in ctor of " + getClass().getName());
	}

	public userDto(String firstName, String lastName, String email, String pwd, LocalDate birthDate,
			String buildingName, String colonyName, String city, String state, String pincode, String phone) {
		super();
		System.out.println("in para ctor of " + getClass().getName());
		this.firstName = firstName;
		this.lastName = lastName;
		
		this.email = email;
		this.pwd = pwd;
		this.birthDate = birthDate;
		this.buildingName = buildingName;
		this.colonyName = colonyName;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		this.phone = phone;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}



	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public String getBuildingName() {
		return buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
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

	public String getphone() {
		return phone;
	}

	public void setphone(String phone) {
		this.phone = phone;
	}
}
