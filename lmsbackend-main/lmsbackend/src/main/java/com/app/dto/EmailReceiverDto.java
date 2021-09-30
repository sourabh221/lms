package com.app.dto;

public class EmailReceiverDto {
	private String email;
	public EmailReceiverDto() {
		System.out.println("in constructor of "+getClass().getName());
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}
