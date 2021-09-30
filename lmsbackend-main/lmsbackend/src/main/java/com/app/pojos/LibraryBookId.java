package com.app.pojos;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class LibraryBookId implements Serializable {

	@Column(name = "book_id")
	private int bookId;
	@Column(name = "library_id")
	private int LibraryId;
	
	public LibraryBookId() {
		System.out.println("in ctor of " + getClass().getName());	
	}

	
	
	public LibraryBookId(int bookId, int libraryId) {
		super();
		System.out.println("in ctor of " + getClass().getName());
		this.bookId = bookId;
		LibraryId = libraryId;
	}



	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookId) {
		this.bookId = bookId;
	}

	public int getLibraryId() {
		return LibraryId;
	}

	public void setLibraryId(int libraryId) {
		LibraryId = libraryId;
	}

	@Override
	public String toString() {
		return "LibraryBookId [bookId=" + bookId + ", LibraryId=" + LibraryId + "]";
	}
	
	

}
