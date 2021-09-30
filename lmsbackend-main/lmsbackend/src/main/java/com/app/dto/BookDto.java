package com.app.dto;

import java.util.UUID;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BookDto {

	private int id;
	private String iSBN;
	private String bookCover;
	private String bookTitle;

	private String bookAuthor;
	
	private String bookDescription;
	
	private int period;
	
	private UUID libraryId;
	private UUID bookId;
	private UUID userId;
	
	
	public BookDto() {
		System.out.println("in constructor of "+getClass().getName());
	}


	public BookDto(String iSBN, String bookCover, String bookTitle, String bookAuthor, String bookDescription,
			UUID libraryId, UUID bookId,UUID userID) {
		super();
		System.out.println("in constructor of "+getClass().getName());
		this.iSBN = iSBN;
		this.bookCover = bookCover;
		this.bookTitle = bookTitle;
		this.bookAuthor = bookAuthor;
		this.bookDescription = bookDescription;
		this.libraryId = libraryId;
		this.bookId = bookId;
		this.userId=userID;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getiSBN() {
		return iSBN;
	}


	public void setiSBN(String iSBN) {
		this.iSBN = iSBN;
	}


	public String getBookCover() {
		return bookCover;
	}


	public void setBookCover(String bookCover) {
		this.bookCover = bookCover;
	}


	public String getBookTitle() {
		return bookTitle;
	}


	public void setBookTitle(String bookTitle) {
		this.bookTitle = bookTitle;
	}


	public String getBookAuthor() {
		return bookAuthor;
	}


	public void setBookAuthor(String bookAuthor) {
		this.bookAuthor = bookAuthor;
	}


	public String getBookDescription() {
		return bookDescription;
	}


	public void setBookDescription(String bookDescription) {
		this.bookDescription = bookDescription;
	}


	public int getPeriod() {
		return period;
	}


	public void setPeriod(int period) {
		this.period = period;
	}


	public UUID getLibraryId() {
		return libraryId;
	}


	public void setLibraryId(UUID libraryId) {
		this.libraryId = libraryId;
	}


	public UUID getBookId() {
		return bookId;
	}


	public void setBookId(UUID bookId) {
		this.bookId = bookId;
	}


	public UUID getUserId() {
		return userId;
	}


	public void setUserId(UUID userId) {
		this.userId = userId;
	}


	@Override
	public String toString() {
		return "BookDto [id=" + id + ", iSBN=" + iSBN + ", bookCover=" + bookCover + ", bookTitle=" + bookTitle
				+ ", bookAuthor=" + bookAuthor + ", bookDescription=" + bookDescription + ", period=" + period
				+ ", libraryId=" + libraryId + ", bookId=" + bookId + ", userId=" + userId + "]";
	}


	
	
	
	

}
