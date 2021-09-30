package com.app.pojos;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="reserve_book_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class ReserveBook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("reservation_id")
	private int reservationId;
	@Column(name="reservation_date")
	@JsonProperty("date")
	private LocalDate reservationDate=LocalDate.now();
	private int period;
	@JsonProperty("active")
	@Column(name="reservation_active")
	private int active=0;
	@JsonManagedReference
	@ManyToOne
	@JoinColumn(name="user",nullable = false)
	private User user;
	@JsonManagedReference
	@ManyToOne
	@JoinColumns({
		@JoinColumn(name="library",nullable = false),
		@JoinColumn(name="book",nullable = false),
	}
	)
	private LibraryBookDetails	 bookDetails;
	public ReserveBook() {
		System.out.println("in constructor of "+getClass().getName());
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
	@Override
	public String toString() {
		return "ReserveBook [reservationId=" + reservationId + ", reservationDate=" + reservationDate + ", period="
				+ period + ", active=" + active + ", user=" + user + ", bookDetails=" + bookDetails + "]";
	}
	
	
	

}
