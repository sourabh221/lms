package com.app.dto;

public class OtherDto {
 private Object id;
	public OtherDto() {
		System.out.println("in ctor of OtherDto");
	}
	public Object getId() {
		return id;
	}
	public void setId(Object id) {
		this.id = id;
	}
	
}
