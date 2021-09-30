package com.app.pojos;

import java.sql.Timestamp;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "library_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class Library {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private int libraryId;
	@Column(name = "serial_no",unique = true,columnDefinition = "BINARY(16)",nullable = false)
	private UUID serialNo=UUID.randomUUID();
	@Column(name = "library_name", length = 80,unique = true)
	private String libraryName;	
	@Column(name = "email", length = 40,unique=true)
	private String email;
	@Column(name = "phone", length = 10,unique=true)
	private String phone;
	@Column(name="password",length=20)
	private String pwd;
	
	//@Column(name="created_timestamp",columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP",updatable = false,insertable = false)
	@Column(name="created_on")
	@JsonProperty("createdOn")
	private Timestamp current_timestamp=new Timestamp(System.currentTimeMillis());


  private boolean isActive=false;
	
	private boolean isEmail=false;
	@JsonManagedReference
	@OneToOne(mappedBy = "library",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private LibraryAddress addr;
	
	@JsonIgnore
	@OneToMany(mappedBy = "library",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Map<String,User> users=new  HashMap<String,User>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "library",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Set<LibraryBookDetails> libBookDetails=new  HashSet<LibraryBookDetails>();
	
	public Library() {
		System.out.println("in ctor of "+getClass().getName());
	}
	
	

	public Library(String libraryName, String email, String phone, String pwd) {
		super();
		this.libraryName = libraryName;
		this.email = email;
		this.phone = phone;
		this.pwd = pwd;
	}



	public int getLibraryId() {
		return libraryId;
	}

	public void setLibraryId(int libraryId) {
		this.libraryId = libraryId;
	}

	public UUID getSerialNo() {
		return serialNo;
	}



	public void setSerialNo(UUID serialNo) {
		this.serialNo = serialNo;
	}



	public String getLibraryName() {
		return libraryName;
	}

	public void setLibraryName(String libraryName) {
		this.libraryName = libraryName;
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

	public Timestamp getCurrent_timestamp() {
		return current_timestamp;
	}

	public void setCurrent_timestamp(Timestamp current_timestamp) {
		this.current_timestamp = current_timestamp;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public boolean isEmail() {
		return isEmail;
	}

	public void setEmail(boolean isEmail) {
		this.isEmail = isEmail;
	}

	public LibraryAddress getAddr() {
		return addr;
	}

	public void setAddr(LibraryAddress addr) {
		this.addr = addr;
	}
	
	public void addAddress(LibraryAddress addr) {
		this.addr=addr;
		addr.setLibrary(this);
	}
	
	public void removeAddress() {
		this.addr.setLibrary(null);
		this.addr=null;
	}

	


	
    public Map<String, User> getUsers() {
		return users;
	}



	public void setUsers(Map<String, User> users) {
		this.users = users;
	}



	public void addUser(User u) {
    	this.users.put(u.getEmail(), u);
    	u.setLibrary(this);
    }
    
    public void deleteUser(User u) {
    	this.users.remove(u.getEmail(), u);
    	u.setLibrary(null);
    }

    
    
	public Set<LibraryBookDetails> getLibBookDetails() {
		return libBookDetails;
	}



	public void setLibBookDetails(Set<LibraryBookDetails> bookDetails) {
		this.libBookDetails = bookDetails;
	}

	
	public void addLiBookDetails(LibraryBookDetails lib) {
		this.libBookDetails.add(lib);
         lib.setLibrary(this);
	}
	
	public void deleteLibBookDetails(LibraryBookDetails lib) {
		this.libBookDetails.remove(lib);
		lib.setLibrary(null);
		
	}


	@Override
	public String toString() {
		return "Library [libraryId=" + libraryId + ", serialNo=" + serialNo + ", libraryName=" + libraryName
				+ ", email=" + email + ", phone=" + phone + ", pwd=" + pwd + ", current_timestamp=" + current_timestamp
				+ ", isActive=" + isActive + ", isEmail=" + isEmail + ", addr=" + addr + "]";
	}
	

	
	
	
}
