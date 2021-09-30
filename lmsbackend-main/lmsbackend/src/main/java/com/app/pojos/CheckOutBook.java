package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name="check_out_book_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class CheckOutBook {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@JsonProperty("checkout_id")
	private int id;
	@JsonProperty("reservation_expiry_date")
	private LocalDate expiryDate;
	@JsonProperty("checkout_date")
	private LocalDate checkOutDate;
	private int userCheckedOut;
	private int libCheckedOut;
	@JsonBackReference
	@OneToOne
	@JoinColumn(name="reservation_history",nullable = false)
	private ReserveBookHistory	 reservationHistory;
	public CheckOutBook() {
		System.out.println("in ctor of "+getClass().getName());
	}
	public CheckOutBook(LocalDate expiryDate) {
		super();
		System.out.println("in ctor of "+getClass().getName());
		this.expiryDate = expiryDate;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public LocalDate getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}
	public LocalDate getCheckOutDate() {
		return checkOutDate;
	}
	public void setCheckOutDate(LocalDate checkOutDate) {
		this.checkOutDate = checkOutDate;
	}
	public int getUserCheckedOut() {
		return userCheckedOut;
	}
	public void setUserCheckedOut(int userCheckedOut) {
		this.userCheckedOut = userCheckedOut;
	}
	public int getLibCheckedOut() {
		return libCheckedOut;
	}
	public void setLibCheckedOut(int libCheckedOut) {
		this.libCheckedOut = libCheckedOut;
	}
	public ReserveBookHistory getReservationHistory() {
		return reservationHistory;
	}
	public void setReservationHistory(ReserveBookHistory reservationHistory) {
		this.reservationHistory = reservationHistory;
	}
	@Override
	public String toString() {
		return "CheckOutBook [id=" + id + ", expiryDate=" + expiryDate + ", checkOutDate=" + checkOutDate
				+ ", userCheckedOut=" + userCheckedOut + ", libCheckedOut=" + libCheckedOut + ", reservationHistory="
				+ reservationHistory + "]";
	}
	
	
	
	

}
