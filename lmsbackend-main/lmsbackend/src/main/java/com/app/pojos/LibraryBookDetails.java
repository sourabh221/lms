package com.app.pojos;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "library_book_details_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class LibraryBookDetails {

	@EmbeddedId
	private LibraryBookId id=new LibraryBookId();
	
	@Column(name = "total_books")
	private int totNoOfBooks;
	@Column(name = "available_books")
	private int availableBooks;
	
	@ManyToOne
	@JoinColumn(name="library",nullable = false)
	private Library library;
	
	
	@ManyToOne
	@JoinColumn(name="book",nullable=false)
	private Book book;
	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "bookDetail",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Set<BookDetails> bookDetails=new  HashSet<BookDetails>();
	
	@JsonIgnore
	@OneToMany(mappedBy ="bookDetails",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Set<ReserveBook> reservations=new  HashSet<ReserveBook>();
	
	
	@JsonIgnore
	@OneToMany(mappedBy ="bookDetails",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Set<ReserveBookHistory> reservationsHistory=new  HashSet<ReserveBookHistory>();
	
	public LibraryBookDetails() {
		System.out.println("in ctor of " + getClass().getName());	
	}
	
	

	public LibraryBookDetails(LibraryBookId id, int totNoOfBooks, int availableBooks) {
		super();
		this.id = id;
		this.totNoOfBooks = totNoOfBooks;
		this.availableBooks = availableBooks;
	}



	public int getTotNoOfBooks() {
		return totNoOfBooks;
	}

	public void setTotNoOfBooks(int totNoOfBooks) {
		this.totNoOfBooks = totNoOfBooks;
	}

	public int getAvailableBooks() {
		return availableBooks;
	}

	public void setAvailableBooks(int availableBooks) {
		this.availableBooks = availableBooks;
	}

	
	
	public Library getLibrary() {
		return library;
	}

	public void setLibrary(Library library) {
		this.library = library;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	
	
	
	public LibraryBookId getId() {
		return id;
	}

	public void setId(LibraryBookId id) {
		this.id = id;
	}

	public Set<BookDetails> getBookDetails() {
		return bookDetails;
	}

	public void setBookDetails(Set<BookDetails> bookDetails) {
		this.bookDetails = bookDetails;
	}

	
	
	public void addBookDetail(BookDetails detail) {
		this.bookDetails.add(detail);
		detail.setBookDetail(this);
	}
	
	public void removeBookDetail(BookDetails detail) {
		this.bookDetails.remove(detail);
		detail.setBookDetail(null);
	}
	
	
	
	public Set<ReserveBook> getReservations() {
		return reservations;
	}



	public void setReservations(Set<ReserveBook> reservations) {
		this.reservations = reservations;
	}


	public void addReservation(ReserveBook reservation) {
		this.reservations.add(reservation);
		reservation.setBookDetails(this);
	}
	
	
	public void removeReservation(ReserveBook reservation) {
		this.reservations.remove(reservation);
		reservation.setBookDetails(null);
	}
	
	

	public Set<ReserveBookHistory> getReservationsHistory() {
		return reservationsHistory;
	}



	public void setReservationsHistory(Set<ReserveBookHistory> reservationsHistory) {
		this.reservationsHistory = reservationsHistory;
	}

	public void addReservationHistory(ReserveBookHistory reservation) {
		this.reservationsHistory.add(reservation);
		reservation.setBookDetails(this);
	}
	
	
	public void removeReservationHistory(ReserveBookHistory reservation) {
		this.reservationsHistory.remove(reservation);
		reservation.setBookDetails(null);
	}
	
	


	@Override
	public String toString() {
		return "LibraryBookDetails [id=" + id + ", totNoOfBooks=" + totNoOfBooks + ", availableBooks=" + availableBooks
				+ "]";
	}
	
	

}
