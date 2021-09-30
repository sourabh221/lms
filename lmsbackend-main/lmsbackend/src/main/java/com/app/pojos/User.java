package com.app.pojos;

import java.sql.Blob;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "user_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private int userId;
	@Column(name = "serial_no",unique = true,columnDefinition = "BINARY(16)",nullable = false)
	private UUID serialNo=UUID.randomUUID();
	@Column(name = "first_name", length = 40)
	private String firstName;
	@Column(name = "last_name", length = 40)
	private String lastName;
	@Column(name = "email", length = 40,unique=true)
	private String email;
	@Column(name = "phone", length = 10,unique=true)
	private String phone;
	@Column(name="password",length=20)
	private String pwd;
	@Column(name="birth_date")
	private LocalDate birthdate;
	//@Column(name="created_timestamp",columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP",updatable = false,insertable = false)
	@Column(name="created_on")
	@JsonProperty("createdOn")
	private Timestamp current_timestamp=new Timestamp(System.currentTimeMillis());
	@Column(name="image",length=100)
	private  String userImage;
	@Column(name="role")
	@Enumerated(EnumType.STRING)
	private Role role;
	private boolean isActive=false;
	private double fine=0;
	private boolean isEmail=false;
	@JsonManagedReference
	@OneToOne(mappedBy = "u",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Address addr;
	@ManyToOne
	@JoinColumn(name="library_id",nullable = true)
	private Library library;
	@JsonBackReference
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Set<ReserveBook> reservations=new  HashSet<ReserveBook>();
	
	
	@JsonBackReference
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Set<ReserveBookHistory> reservationsHistory=new  HashSet<ReserveBookHistory>();
	public User(){
		System.out.println("in ctor of "+getClass().getName());
	}
	
	
	public User(String firstName, String lastName, String phone, String email, String pwd, LocalDate birthdate) {

		super();
		System.out.println("in parameterised ctor of "+getClass().getName());
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone=phone;
		this.email = email;
		this.pwd = pwd;
		this.birthdate = birthdate;
	}


	


	public int getUserId() {
		return userId;
	}


	public void setUserId(int userId) {
		this.userId = userId;
	}


	public UUID getSerialNo() {
		return serialNo;
	}


	public void setSerialNo(UUID serialNo) {
		this.serialNo = serialNo;
	}


	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}


	public void setEmail(boolean isEmail) {
		this.isEmail = isEmail;
	}


	public boolean getIsActive() {
		return isActive;
	}


	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getPwd() {
		return pwd;
	}


	public void setPwd(String pwd) {
		this.pwd = pwd;
	}


	public LocalDate getBirthdate() {
		return birthdate;
	}


	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}


	public Timestamp getCurrent_timestamp() {
		return current_timestamp;
	}


	public void setCurrent_timestamp(Timestamp current_timestamp) {
		this.current_timestamp = current_timestamp;
	}


	public String getUserImage() {
		return userImage;
	}


	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}
	
	



	public Role getRole() {
		return role;
	}


	public void setRole(Role role) {
		this.role = role;
	}


	


	public double getFine() {
		return fine;
	}


	public void setFine(double fine) {
		this.fine = fine;
	}


	public boolean getIsEmail() {
		return isEmail;
	}


	public void setIsEmail(boolean isEmail) {
		this.isEmail = isEmail;
	}


	public Address getAddr() {
		return addr;
	}


	public void setAddr(Address addr) {
		this.addr = addr;
	}

	public void addAddress(Address addr) {
		this.addr=addr;
		addr.setU(this);
	}
	
	public void removeAddress() {
		this.addr.setU(null);
		this.addr=null;
	}
	
	


	public Library getLibrary() {
		return library;
	}


	public void setLibrary(Library library) {
		this.library = library;
	}
	
	


	public Set<ReserveBook> getReservations() {
		return reservations;
	}


	public void setReservations(Set<ReserveBook> reservations) {
		this.reservations = reservations;
	}

	public void addReservation(ReserveBook reservation) {
		this.reservations.add(reservation);
		reservation.setUser(this);
	}
	
	
	public void removeReservation(ReserveBook reservation) {
		this.reservations.remove(reservation);
		reservation.setUser(null);
	}
	
	
	

	public Set<ReserveBookHistory> getReservationsHistory() {
		return reservationsHistory;
	}


	public void setReservationsHistory(Set<ReserveBookHistory> reservationsHistory) {
		this.reservationsHistory = reservationsHistory;
	}
	public void addReservationHistory(ReserveBookHistory reservation) {
		this.reservationsHistory.add(reservation);
		reservation.setUser(this);
	}
	
	
	public void removeReservationHistory(ReserveBookHistory reservation) {
		this.reservationsHistory.remove(reservation);
		reservation.setUser(null);
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", serialNo=" + serialNo + ", firstName=" + firstName + ", lastName="
				+ lastName + ", email=" + email + ", phone=" + phone + ", pwd=" + pwd + ", birthdate=" + birthdate
				+ ", current_timestamp=" + current_timestamp + ", userImage=" + userImage + ", role=" + role
				+ ", isActive=" + isActive + ", fine=" + fine + ", isEmail=" + isEmail + ", addr=" + addr + "]";
	}
	
	
	
	
}
