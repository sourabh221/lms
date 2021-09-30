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
@Table(name="return_book_history_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class ReturnBookHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("return_book_id")
	private int id;
	private int returnId;
	@Column(name="last_date_to_return")
	@JsonProperty("last_date_to_return")
	private LocalDate lastDateToReturn;
	@Column(name="returned_on")
	@JsonProperty("returned_on")
	private LocalDate returnedOn;
	private int librarianId;
	@JsonBackReference
	@OneToOne
	@JoinColumn(name="reservation_history",nullable = false)
	private ReserveBookHistory	 reservationHistory;
	public ReturnBookHistory() {
		System.out.println("in ctor of "+getClass().getName());
	}

	
	
	public ReturnBookHistory(int returnId, LocalDate lastDateToReturn, LocalDate returnedOn, int librarianId) {
		super();
		this.returnId = returnId;
		this.lastDateToReturn = lastDateToReturn;
		this.returnedOn = returnedOn;
		this.librarianId = librarianId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getReturnId() {
		return returnId;
	}
	public void setReturnId(int returnId) {
		this.returnId = returnId;
	}
	public LocalDate getLastDateToReturn() {
		return lastDateToReturn;
	}
	public void setLastDateToReturn(LocalDate lastDateToReturn) {
		this.lastDateToReturn = lastDateToReturn;
	}
	public LocalDate getReturnedOn() {
		return returnedOn;
	}
	public void setReturnedOn(LocalDate returnedOn) {
		this.returnedOn = returnedOn;
	}
	
	
	public int getLibrarianId() {
		return librarianId;
	}



	public void setLibrarianId(int librarianId) {
		this.librarianId = librarianId;
	}



	public ReserveBookHistory getReservationHistory() {
		return reservationHistory;
	}
	public void setReservationHistory(ReserveBookHistory reservationHistory) {
		this.reservationHistory = reservationHistory;
	}



	@Override
	public String toString() {
		return "ReturnBookHistory [id=" + id + ", returnId=" + returnId + ", lastDateToReturn=" + lastDateToReturn
				+ ", returnedOn=" + returnedOn + ", librarianId=" + librarianId + ", reservationHistory="
				+ reservationHistory + "]";
	}
	
	
	
	

}
