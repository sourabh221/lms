package com.app.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Email_UUID_dto;
import com.app.dto.ResultDto;
import com.app.pojos.ReserveBookHistory;
import com.app.pojos.User;
import com.app.service.ReserveBookHistoryServiceImpl;
import com.app.service.UserServiceImpl;


@RestController
@RequestMapping("/user/reserveBookHistory")
@CrossOrigin("http://localhost:3060")
public class UserReserveBookHistoryController {

	@Autowired
	ReserveBookHistoryServiceImpl reserveBookHistoryServiceImpl;
	
	@Autowired
	UserServiceImpl userServiceImpl;
	
	public UserReserveBookHistoryController() {
		System.out.println("in ctor of "+getClass().getName());
	}

	
	@PutMapping("/get-reservation-history")
	public ResponseEntity<?> getReservationHistoryByUser(@RequestBody Email_UUID_dto email_UUID_dto){
		System.out.println("in method of getReservationHistoryByUser of "+getClass().getName()+" serialNo "+email_UUID_dto.getSerialNo());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			User u=userServiceImpl.getUserBySerialNo(email_UUID_dto.getSerialNo());
			if(u!=null) {
				List<ReserveBookHistory> reservationHistories=reserveBookHistoryServiceImpl.getReservationHistoryByUser(u);
				if(reservationHistories!=null) {
					result.setData(reservationHistories);
					result.setStatus("success");
				}else {
					result.setData("reservation history is not available");
				}
			}else {
			result.setData("user not found");
			}
		} catch (Exception e) {
			System.out.println("exception caught in getReservationHistoryByUser of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
}
