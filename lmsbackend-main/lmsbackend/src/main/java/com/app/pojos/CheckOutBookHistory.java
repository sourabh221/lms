package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name="check_out_book_history_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class CheckOutBookHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("checkout_history_id")
	private int id;
	@Column(unique = true)
	@JsonProperty("checkout_id")
	private int checkoutId;
	@JsonProperty("checkout_date")
	private LocalDate checkoutDate;
	@JsonProperty("return_date")
	private LocalDate returnDate;
	private boolean issued;
	@JsonBackReference
	@OneToOne
	@JoinColumn(name="reservation_history",nullable = false)
	private ReserveBookHistory	 reservationHistory;

	public CheckOutBookHistory() {
		System.out.println("in ctor of "+getClass().getName());
			}

	public CheckOutBookHistory(int checkoutId, boolean issued) {
		super();
		System.out.println("in ctor of "+getClass().getName());
		this.checkoutId = checkoutId;
		this.issued = issued;
	}

	public CheckOutBookHistory(int checkoutId, LocalDate checkoutDate, boolean issued) {
		super();
		System.out.println("in ctor of "+getClass().getName());
		this.checkoutId = checkoutId;
		this.checkoutDate = checkoutDate;
		this.issued = issued;
	}
	

	public CheckOutBookHistory(int checkoutId, LocalDate checkoutDate, LocalDate returnDate, boolean issued) {
		super();
		System.out.println("in ctor of "+getClass().getName());
		this.checkoutId = checkoutId;
		this.checkoutDate = checkoutDate;
		this.returnDate = returnDate;
		this.issued = issued;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCheckoutId() {
		return checkoutId;
	}

	public void setCheckoutId(int checkoutId) {
		this.checkoutId = checkoutId;
	}

	public LocalDate getCheckoutDate() {
		return checkoutDate;
	}

	public void setCheckoutDate(LocalDate checkoutDate) {
		this.checkoutDate = checkoutDate;
	}

	public LocalDate getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDate returnDate) {
		this.returnDate = returnDate;
	}

	public boolean isIssued() {
		return issued;
	}

	public void setIssued(boolean issued) {
		this.issued = issued;
	}

	public ReserveBookHistory getReservationHistory() {
		return reservationHistory;
	}

	public void setReservationHistory(ReserveBookHistory reservationHistory) {
		this.reservationHistory = reservationHistory;
	}

	@Override
	public String toString() {
		return "CheckOutBookHistory [id=" + id + ", checkoutId=" + checkoutId + ", checkoutDate=" + checkoutDate
				+ ", returnDate=" + returnDate + ", issued=" + issued + ", reservationHistory=" + reservationHistory
				+ "]";
	}
}
