package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="reserve_book_history_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class ReserveBookHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true)
	@JsonProperty("reservation_id")
	private int reservationId;
	@JsonProperty("reservation_date")
	private LocalDate reservationDate;
	@JsonProperty("checkout_date")
	private LocalDate checkoutDate;
	private int period;
	private int active;
	
	@JsonManagedReference
	@ManyToOne
	@JoinColumn(name="user",nullable = false)
	private User user;
	@JsonManagedReference
	@ManyToOne
	@JoinColumns({
		@JoinColumn(name="library",nullable = false),
		@JoinColumn(name="book",nullable = false),
	})
	private LibraryBookDetails	 bookDetails;
	
	@JsonManagedReference
	@OneToOne(mappedBy = "reservationHistory",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private CheckOutBook checkOutBook;
	
	@JsonManagedReference
	@OneToOne(mappedBy = "reservationHistory",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private CheckOutBookHistory checkOutBookHistory;
	
	@JsonManagedReference
	@OneToOne(mappedBy = "reservationHistory",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private  ReturnBook returnBook;
	
	@JsonManagedReference
	@OneToOne(mappedBy = "reservationHistory",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private  ReturnBookHistory returnBookHistory;
	
	public ReserveBookHistory() {
		System.out.println("in ctor of "+getClass().getName());
	}

	

	public ReserveBookHistory(int reservationId, LocalDate reservationDate, LocalDate checkoutDate, int period,
			int active) {
		super();
		System.out.println("in ctor of "+getClass().getName());
		this.reservationId = reservationId;
		this.reservationDate = reservationDate;
		this.checkoutDate = checkoutDate;
		this.period = period;
		this.active = active;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getReservationId() {
		return reservationId;
	}

	public void setReservationId(int reservationId) {
		this.reservationId = reservationId;
	}

	public LocalDate getReservationDate() {
		return reservationDate;
	}

	public void setReservationDate(LocalDate reservationDate) {
		this.reservationDate = reservationDate;
	}

	public LocalDate getCheckoutDate() {
		return checkoutDate;
	}

	public void setCheckoutDate(LocalDate checkoutDate) {
		this.checkoutDate = checkoutDate;
	}

	public int getPeriod() {
		return period;
	}

	public void setPeriod(int period) {
		this.period = period;
	}

	
	
	public int getActive() {
		return active;
	}



	public void setActive(int active) {
		this.active = active;
	}

	


	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LibraryBookDetails getBookDetails() {
		return bookDetails;
	}

	public void setBookDetails(LibraryBookDetails bookDetails) {
		this.bookDetails = bookDetails;
	}

	
	public CheckOutBook getCheckOutBook() {
		return checkOutBook;
	}

	public void setCheckOutBook(CheckOutBook checkOutBook) {
		this.checkOutBook = checkOutBook;
	}

	public void addCheckOutBook(CheckOutBook checkOutBook) {
		this.checkOutBook=checkOutBook;
		checkOutBook.setReservationHistory(this);
	}
	
	
	public void removeCheckOutBook() {
		this.checkOutBook.setReservationHistory(null);
		this.checkOutBook=null;
		
	}

	


	public CheckOutBookHistory getCheckOutBookHistory() {
		return checkOutBookHistory;
	}



	public void setCheckOutBookHistory(CheckOutBookHistory checkOutBookHistory) {
		this.checkOutBookHistory = checkOutBookHistory;
	}
	
	public void addCheckOutBookHistory(CheckOutBookHistory checkOutBook) {
		this.checkOutBookHistory=checkOutBook;
		checkOutBook.setReservationHistory(this);
	}
	



	public ReturnBook getReturnBook() {
		return returnBook;
	}



	public void setReturnBook(ReturnBook returnBook) {
		this.returnBook = returnBook;
	}


	public void addReturnBook(ReturnBook book) {
		this.returnBook=book;
		book.setReservationHistory(this);
	}
	
	
	public void removeReturnBook() {
		this.returnBook.setReservationHistory(null);
		this.returnBook=null;
		
	}
	
	

	public ReturnBookHistory getReturnBookHistory() {
		return returnBookHistory;
	}



	public void setReturnBookHistory(ReturnBookHistory returnBookHistory) {
		this.returnBookHistory = returnBookHistory;
	}

	
	public void addReturnBookHistory(ReturnBookHistory returnBookHistory) {
		this.returnBookHistory=returnBookHistory;
	    returnBookHistory.setReservationHistory(this);
	}


	@Override
	public String toString() {
		return "ReserveBookHistory [id=" + id + ", reservationId=" + reservationId + ", reservationDate="
				+ reservationDate + ", checkoutDate=" + checkoutDate + ", period=" + period + ", active=" + active
				 + ", user=" + user + ", bookDetails=" + bookDetails + "]";
	}




	
	

}
