package com.app.pojos;

import java.sql.Timestamp;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "book_details_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class BookDetails {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	@JsonProperty("id")
    private int bookId;
	@Column(length = 13, nullable = false)
	@JsonProperty("ISBN")
	private String iSBN;
	@Column(name="added_on")
	@JsonProperty("addedOn")
	private Timestamp addedTimeStamp=new Timestamp(System.currentTimeMillis());
	@Column(name="added_date")
	private LocalDate addedDate=LocalDate.now();
	@JsonBackReference
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumns({
		@JoinColumn(name="book",nullable = false),
		@JoinColumn(name="library",nullable = false),
	}
	)
	private LibraryBookDetails bookDetail;
	public BookDetails() {
		System.out.println("in ctor of " + getClass().getName());
	}
	
	
	public BookDetails(String iSBN) {
		super();
		this.iSBN = iSBN;
	}


	public int getBookId() {
		return bookId;
	}
	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	public String getiSBN() {
		return iSBN;
	}
	public void setiSBN(String iSBN) {
		this.iSBN = iSBN;
	}
	public Timestamp getAddedTimeStamp() {
		return addedTimeStamp;
	}
	public void setAddedTimeStamp(Timestamp addedTimeStamp) {
		this.addedTimeStamp = addedTimeStamp;
	}
	public LocalDate getAddedDate() {
		return addedDate;
	}
	public void setAddedDate(LocalDate addedDate) {
		this.addedDate = addedDate;
	}
	public LibraryBookDetails getBookDetail() {
		return bookDetail;
	}
	public void setBookDetail(LibraryBookDetails bookDetail) {
		this.bookDetail = bookDetail;
	}
	@Override
	public String toString() {
		return "BookDetails [bookId=" + bookId + ", iSBN=" + iSBN + ", addedTimeStamp=" + addedTimeStamp
				+ ", addedDate=" + addedDate + "]";
	}
	
	
	
	

}
