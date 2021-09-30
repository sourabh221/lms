package com.app.dto;

public class ResultDto {
	private String status;
	private Object data;
	public ResultDto() {
		System.out.println("in ctor of " + getClass().getName());
	}


	public ResultDto(String status, Object data) {
		super();
		this.status = status;
		this.data = data;
	}


	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
}
