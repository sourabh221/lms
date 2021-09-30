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
@Table(name="return_book_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class ReturnBook {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("return_book_id")
	private int id;
	@Column(name="last_date_to_return")
	@JsonProperty("last_date_to_return")
	private LocalDate lastDateToReturn;
	private int isReturn;
	private int libIsReturn;
	@Column(name="notification_sent_on")
	@JsonProperty("notification_sent_on")
	private LocalDate NotificationSentOn;
	@JsonBackReference
	@OneToOne
	@JoinColumn(name="reservation_history",nullable = false)
	private ReserveBookHistory	 reservationHistory;
	public ReturnBook() {
		System.out.println("in ctor of "+getClass().getName());
	}
	
	
	
	public ReturnBook(LocalDate lastDateToReturn) {
		super();
		System.out.println("in ctor of "+getClass().getName());
		this.lastDateToReturn = lastDateToReturn;
	}



	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public LocalDate getLastDateToReturn() {
		return lastDateToReturn;
	}
	public void setLastDateToReturn(LocalDate lastDateToReturn) {
		this.lastDateToReturn = lastDateToReturn;
	}
	public int getIsReturn() {
		return isReturn;
	}
	public void setIsReturn(int isReturn) {
		this.isReturn = isReturn;
	}
	public int getLibIsReturn() {
		return libIsReturn;
	}
	public void setLibIsReturn(int libIsReturn) {
		this.libIsReturn = libIsReturn;
	}
	
	
	
	public LocalDate getNotificationSentOn() {
		return NotificationSentOn;
	}



	public void setNotificationSentOn(LocalDate notificationSentOn) {
		NotificationSentOn = notificationSentOn;
	}



	public ReserveBookHistory getReservationHistory() {
		return reservationHistory;
	}
	public void setReservationHistory(ReserveBookHistory reservationHistory) {
		this.reservationHistory = reservationHistory;
	}
	@Override
	public String toString() {
		return "ReturnBook [id=" + id + ", lastDateToReturn=" + lastDateToReturn + ", isReturn=" + isReturn
				+ ", libIsReturn=" + libIsReturn + ", reservationHistory=" + reservationHistory + "]";
	}

	
}
