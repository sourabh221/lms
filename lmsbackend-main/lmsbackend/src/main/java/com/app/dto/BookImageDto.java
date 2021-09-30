package com.app.dto;

import java.sql.Blob;

import com.app.pojos.Book;

public class BookImageDto {
private Book book;
private Blob bookImage;
	public BookImageDto() {
		System.out.println("in constructor of "+getClass().getName());
	}
	
	public BookImageDto(Book book, Blob bookImage) {
		super();
		System.out.println("in constructor of "+getClass().getName());
		this.book = book;
		this.bookImage = bookImage;
	}

	public Book getBook() {
		return book;
	}
	public void setBook(Book book) {
		this.book = book;
	}
	public Blob getBookImage() {
		return bookImage;
	}
	public void setBookImage(Blob bookImage) {
		this.bookImage = bookImage;
	}
	
	

}
