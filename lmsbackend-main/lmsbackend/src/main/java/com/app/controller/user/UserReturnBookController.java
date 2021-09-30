package com.app.controller.user;

import java.time.LocalDate;
import java.time.Period;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookDto;
import com.app.dto.OtherDto;
import com.app.dto.ResultDto;
import com.app.pojos.ReserveBookHistory;
import com.app.pojos.ReturnBook;
import com.app.pojos.User;
import com.app.service.ReturnBookServiceImpl;
import com.app.service.UserServiceImpl;
import com.app.utils.UserUtils;

@RestController
@RequestMapping("/user/returnBook")
@CrossOrigin("http://localhost:3060")
public class UserReturnBookController {

	@Autowired
	ReturnBookServiceImpl returnBookServiceImpl;
	
	@Autowired
	UserServiceImpl userServiceImpl;
	
	public UserReturnBookController() {
		System.out.println("in ctor of "+getClass().getName());
	}
	
	
	@PutMapping("/return-book-by-user")
	public ResponseEntity<?> returnBookByUser(@RequestBody OtherDto otherDto){
		System.out.println("in method of returnBookByUser of "+getClass().getName()+" "+otherDto.getId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			int id=(Integer)otherDto.getId();
			ReturnBook returnBook=returnBookServiceImpl.getReturnBookById(id);
			if(returnBook!=null) {
				Long fine=0l;
				Set<ReserveBookHistory> reservaBookHistories=returnBook.getReservationHistory().getUser().getReservationsHistory();
				if(reservaBookHistories!=null) {
					for(ReserveBookHistory history:reservaBookHistories) {
						if(history.getReturnBook()!=null) {
							Period period=Period.between(history.getReturnBook().getLastDateToReturn(), LocalDate.now());
							fine +=UserUtils.calculateFine(period.getDays())>0?UserUtils.calculateFine(period.getDays()):0;	
							System.out.println("period= "+period.getDays());
						}
					}
				
				if(fine>0) {
					
				  User user=returnBook.getReservationHistory().getUser();
					user.setFine(fine);
					User u =userServiceImpl.addUser(user);
					if(u!=null) {
						result.setData("please pay the fine first of rupee "+fine);
						result.setStatus("success");
					}else {
						result.setData("something went wrong while updating users fine");
					}
					
				}else {
				returnBook.setIsReturn(1);
				ReturnBook r1=returnBookServiceImpl.addReturnBook(returnBook);
				if(r1!=null) {
					result.setStatus("success");
					result.setData("book issued successfully please wait for librarian action");
				}else {
					result.setData("while updating return book something went wrong");
				}
				
				}
				
			}else {
				result.setData("reserve book  histories not available");
			}
			
		}else {
			result.setData("return book id is invalid");
		}
		}catch (Exception e) {
			System.out.println("exception caught in returnBookByUser of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	
	@PutMapping("/Calculate-fine-of-User")
	public ResponseEntity<?> CalculateFineOfUser(@RequestBody BookDto bookDto){
		System.out.println("in method of CalculateFineOfUser of "+getClass().getName()+" "+bookDto.getUserId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			long fine=0l;
			User user=userServiceImpl.getUserBySerialNo(bookDto.getUserId());
			if(user!=null) {
				Set<ReserveBookHistory> reservaBookHistories=user.getReservationsHistory();
				if(reservaBookHistories!=null) {
					for(ReserveBookHistory history:reservaBookHistories) {
						if(history.getReturnBook()!=null) {
							Period period=Period.between(history.getReturnBook().getLastDateToReturn(), LocalDate.now());
							fine +=UserUtils.calculateFine(period.getDays())>0?UserUtils.calculateFine(period.getDays()):0;	
						}
					}
					if(fine>0) {
						user.setFine(fine);
						User u =userServiceImpl.addUser(user);
						if(u!=null) {

							result.setData(fine);
							result.setStatus("success");
						}else {
							result.setData("something went wrong while updating users fine");
						}
					}else {
						result.setData("fine is zero");
					}
				}else {
					result.setData("u havent take any book yet ");
				}
			}else {
				result.setData("user not found");
			}
		} catch (Exception e) {
			System.out.println("exception caught in CalculateFineOfUser of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	@PutMapping("/fine-paid")
	public ResponseEntity<?> findPaidByUser(@RequestBody BookDto bookDto){
		System.out.println("in method of findPaidByUser of "+getClass().getName()+" "+bookDto.getUserId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			User user=userServiceImpl.getUserBySerialNo(bookDto.getUserId());
			if(user!=null) {
				Set<ReserveBookHistory> reservaBookHistories=user.getReservationsHistory();
				if(reservaBookHistories!=null) {
					for(ReserveBookHistory history:reservaBookHistories) {
						if(history.getReturnBook()!=null) {
							ReturnBook returnBook=history.getReturnBook();
							returnBook.setIsReturn(1);
							ReturnBook r1=returnBookServiceImpl.addReturnBook(returnBook);
							
						}
					}
					user.setFine(0);
					User u=userServiceImpl.addUser(user);
					if(u!=null) {
						result.setData("fine paid successfully");
						result.setStatus("success");
					}
					
					
				}else {
					result.setData("u havent take any book yet ");
					result.setStatus("success");
				}
			}else {
				result.setData("user not found");
			}
		} catch (Exception e) {
			System.out.println("exception caught in findPaidByUser of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	

}
