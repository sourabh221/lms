package com.app.pojos;

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
@Table(name="address_tbl")
@JsonInclude(Include.NON_DEFAULT)
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("address_id")
	private int addressId;

	@Column(length=40)
	private String buildingName;

	@Column(length=40)
	private String colonyName;

	@Column(length=40)
	private String city;

	@Column(length=40)
	private String state;

	@Column(length=6)
	private String pincode;

	
	@JsonBackReference
	@OneToOne
	@JoinColumn(name="userId",nullable = false)
	private User u;

	
	

	Address(){
		System.out.println("in ctor of "+getClass().getName());
	}

	
	public Address(String buildingName, String colonyName, String city, String state, String pincode
			) {
		super();
		
		this.buildingName = buildingName;
		this.colonyName = colonyName;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		
	}


	public int getAddressId() {
		return addressId;
	}


	public void setAddressId(int addressId) {
		this.addressId = addressId;
	}


	public String getBuildingName() {
		return buildingName;
	}


	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}


	public String getColonyName() {
		return colonyName;
	}


	public void setColonyName(String colonyName) {
		this.colonyName = colonyName;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public String getPincode() {
		return pincode;
	}


	public void setPincode(String pincode) {
		this.pincode = pincode;
	}


	


	public User getU() {
		return u;
	}


	public void setU(User u) {
		this.u = u;
	}
	
	
	





	@Override
	public String toString() {
		return "Address [addressId=" + addressId + ", buildingName=" + buildingName + ", colonyName=" + colonyName
				+ ", city=" + city + ", state=" + state + ", pincode=" + pincode +  "]";
	}


	
	
	
	
	
}
