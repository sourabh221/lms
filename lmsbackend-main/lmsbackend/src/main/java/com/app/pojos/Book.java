package com.app.pojos;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "books_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("book_id")
	private int id;
	
	@Column(name = "serial_no",unique = true,columnDefinition = "BINARY(16)",nullable = false)
	private UUID serialNo=UUID.randomUUID();
	@Column(length = 13, nullable = false, unique = true)
	@JsonProperty("ISBN")
	private String iSBN;
	private String bookCover;
	@Column(length = 100, nullable = false)
	@JsonProperty("bookTitle")
	private String bookTitle;
	@Column(length = 100, nullable = false)
	@JsonProperty("bookAuthor")
	private String bookAuthor;
	@JsonProperty("bookDescription")
	private String bookDescription;
	@JsonIgnore
	@OneToMany(mappedBy = "book",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Set<LibraryBookDetails> bookDetails=new  HashSet<LibraryBookDetails>();
	
	public Book() {
		System.out.println("in ctor of " + getClass().getName());
	}
	
	

	public Book(String iSBN, String bookTitle, String bookAuthor, String bookDescription) {
		super();
		System.out.println("in ctor of " + getClass().getName());
		this.iSBN = iSBN;
		this.bookTitle = bookTitle;
		this.bookAuthor = bookAuthor;
		this.bookDescription = bookDescription;
	}



	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public UUID getSerialNo() {
		return serialNo;
	}



	public void setSerialNo(UUID serialNo) {
		this.serialNo = serialNo;
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


	public Set<LibraryBookDetails> getBookDetails() {
		return bookDetails;
	}



	public void setBookDetails(Set<LibraryBookDetails> bookDetails) {
		this.bookDetails = bookDetails;
	}

	
	public void addBookDetails(LibraryBookDetails lib) {
		this.bookDetails.add(lib);
         lib.setBook(this);
	}
	
	public void deleteBookDetails(LibraryBookDetails lib) {
		this.bookDetails.remove(lib);
		lib.setBook(null);
		
	}


	@Override
	public String toString() {
		return "Book [id=" + id + ", iSBN=" + iSBN + ", bookTitle=" + bookTitle + ", bookAuthor=" + bookAuthor + "]";
	}
	
	
	
	

	
}
