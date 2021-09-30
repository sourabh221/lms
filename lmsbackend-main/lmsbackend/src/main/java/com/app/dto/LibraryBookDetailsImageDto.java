package com.app.dto;

import java.sql.Blob;

import com.app.pojos.LibraryBookDetails;

public class LibraryBookDetailsImageDto {

	private  LibraryBookDetails lbd;
	private  Blob bookImage;
	
	public LibraryBookDetailsImageDto() {
		System.out.println("in constructor of "+getClass().getName());
	}
	
	

	public LibraryBookDetailsImageDto(LibraryBookDetails lbd, Blob bookImage) {
		super();
		System.out.println("in constructor of "+getClass().getName());
		this.lbd = lbd;
		this.bookImage = bookImage;
	}



	public LibraryBookDetails getLbd() {
		return lbd;
	}

	public void setLbd(LibraryBookDetails lbd) {
		this.lbd = lbd;
	}

	public Blob getBookImage() {
		return bookImage;
	}

	public void setBookImage(Blob bookImage) {
		this.bookImage = bookImage;
	}
	
	

}
