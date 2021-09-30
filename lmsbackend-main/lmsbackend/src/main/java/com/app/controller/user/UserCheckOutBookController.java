package com.app.controller.user;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalDate;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.hibernate.annotations.Check;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OtherDto;
import com.app.dto.ResultDto;
import com.app.pojos.Book;
import com.app.pojos.CheckOutBook;
import com.app.pojos.CheckOutBookHistory;
import com.app.pojos.LibraryBookDetails;
import com.app.pojos.LibraryBookId;
import com.app.pojos.ReserveBook;
import com.app.pojos.ReserveBookHistory;
import com.app.pojos.User;
import com.app.service.CheckOutBookServiceImpl;
import com.app.service.LibraryBookDetailsServiceImpl;
import com.app.service.LibraryServiceImpl;
import com.app.service.ReserveBookHistoryServiceImpl;
import com.app.service.ReserveBookServiceImpl;


@RestController
@RequestMapping("/user/checkOutBook")
@CrossOrigin("http://localhost:3060")
public class UserCheckOutBookController {
	
	@Autowired
	CheckOutBookServiceImpl checkOutBookServiceImpl;
	
	@Autowired
	ReserveBookHistoryServiceImpl reserveBookHistoryServiceImpl;
	
	@Autowired
	LibraryServiceImpl libraryServiceImpl;
	
	@Autowired
	LibraryBookDetailsServiceImpl libraryBookDetailsServiceImpl;
	
	@Autowired
	ReserveBookServiceImpl reserveBookServiceImpl;
	
	@Autowired
	private JavaMailSender emailSender;
	
	public UserCheckOutBookController() {
		System.out.println("in ctor of "+getClass().getName());
	}

	
	@PutMapping("/check-out-by-user")
	public ResponseEntity<?> checkOutBookByUser(@RequestBody OtherDto otherDto){
		System.out.println("in method of checkOutBookByUser of "+getClass().getName()+" "+otherDto.getId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			int id=(Integer)otherDto.getId();
			CheckOutBook c=checkOutBookServiceImpl.getCheckOutBookById(id);
			if(c!=null) {
				c.setUserCheckedOut(1);
				CheckOutBook c1=checkOutBookServiceImpl.addCheckOutBook(c);
				if(c1!=null) {
					result.setData("book checked out successfully now wait for librarian action");
					result.setStatus("success");
				}else {
					result.setData("something went wrong while checking out");
				}
			}else {
				result.setData("check out book id is invalid");
			}
		} catch (Exception e) {
			System.out.println("exception caught in checkOutBookByUser of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	
	@PutMapping("/delete-check-out-book")
	public ResponseEntity<?> deleteCheckOutBook(@RequestBody OtherDto otherDto){
		System.out.println("in method of deleteCheckOutBook of "+getClass().getName()+" "+otherDto.getId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			int id=(Integer)otherDto.getId();
			CheckOutBook c=checkOutBookServiceImpl.getCheckOutBookById(id);
			if(c!=null) {
				/*ReserveBookHistory history=c.getReservationHistory();
				history.getBookDetails().setAvailableBooks(history.getBookDetails().getAvailableBooks()+1);
				history.addCheckOutBookHistory(new CheckOutBookHistory(c.getId(), false));
				history.removeCheckOutBook();
				
				ReserveBookHistory r1=reserveBookHistoryServiceImpl.addReserBookHistory(history);
				if(r1!=null) {
					result.setData("record deleted success");
					result.setStatus("success");
					
				}else {
					result.setData("something went wrong while updating library bookdetails availablebooks");
				}*/
				
				c.getReservationHistory().getBookDetails().setAvailableBooks(c.getReservationHistory().getBookDetails().getAvailableBooks()+1);
				c.getReservationHistory().addCheckOutBookHistory(new CheckOutBookHistory(c.getId(), false));
				CheckOutBook c1=checkOutBookServiceImpl.addCheckOutBook(c);
				if(c1!=null) {
					checkOutBookServiceImpl.deleteCheckOutBook(id);
					result.setData("record deleted success");
					result.setStatus("success");
					
				}else {
					result.setData("something went wrong while updating library bookdetails availablebooks");
				}
				
				
			}else {
				result.setData("check out book id is invalid");
			}
		} catch (Exception e) {
			System.out.println("exception caught in deleteCheckOutBook of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	public void checkForAvailability(LibraryBookDetails lbd) {
		System.out.println("in checkForAvailability method of "+getClass().getName()+" "+lbd.getLibrary().getLibraryName());
		try {
			List<ReserveBook> reservations=reserveBookServiceImpl.getReservationsByLBD(lbd);
			if(reservations!=null) {
				for (ReserveBook reserveBook : reservations) {
					System.out.println(reserveBook);
					LibraryBookDetails lbd1=libraryBookDetailsServiceImpl.getByLibraryBookId(new LibraryBookId(reserveBook.getBookDetails().getBook().getId(),reserveBook.getBookDetails().getLibrary().getLibraryId()));
					if(lbd1!=null) {
						if(lbd1.getAvailableBooks()!=0) {
							lbd1.setAvailableBooks(lbd1.getAvailableBooks()-1);
							ReserveBookHistory reserveBookHistory=new ReserveBookHistory(reserveBook.getReservationId(), reserveBook.getReservationDate(),LocalDate.now().plusDays(3), reserveBook.getPeriod(),1);
							CheckOutBook checkOutBook=new CheckOutBook(LocalDate.now().plusDays(3));
							reserveBookHistory.addCheckOutBook(checkOutBook);
							reserveBookHistory.setUser(reserveBook.getUser());
							lbd1.addReservationHistory(reserveBookHistory);
							LibraryBookDetails lbd2=libraryBookDetailsServiceImpl.addBook(lbd1);
							if(lbd2!=null) {
								reservationAvailableMailSender(reserveBook);
								reserveBookServiceImpl.deleteReservation(reserveBook.getReservationId());
							}
						}else {
							System.out.println("books are not available for "+reserveBook.getUser().getEmail()+" "+reserveBook.getBookDetails().getBook().getBookTitle());
						}
					}
				}
			}else {
				System.out.println("reservations are not available");
			}
		} catch (Exception e) {
			System.out.println("exception caught in checkForAvailability of "+getClass().getName());
			System.out.println(e.getMessage());
			
		}
	}
	
	public void reservationAvailableMailSender(ReserveBook reservation) {
		System.out.println("in reservation available mail sender");
		User user=reservation.getUser();
		Book book=reservation.getBookDetails().getBook();
		String pathToAttachment = "E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Template\\reservation_available.html";
		try {
			File file = new File(pathToAttachment);
			BufferedReader reader = new BufferedReader(new FileReader(file));
			String line = reader.readLine();
			String content = "";
			while (line != null) {
				content = content + line + System.lineSeparator();

				line = reader.readLine();
			}
			reader.close();
			content = content.replaceAll("firstName", user.getFirstName());
			content = content.replaceAll("lastName", user.getLastName());
			content = content.replaceAll("bookTitle", book.getBookTitle());
			content = content.replaceAll("reservationId", String.valueOf(reservation.getReservationId()));
			MimeMessage message = emailSender.createMimeMessage();

			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setFrom("sourabhthote22@gmail.com");
			helper.setTo(user.getEmail());
			helper.setSubject("reservation availble for book " + book.getBookTitle());
			helper.setText(content, true);
			helper.addInline("image1",
					new File("E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Template\\welcome.jpg"));
			if (book.getBookCover() != null) {
				helper.addInline("image2",
						new File("E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\Book\\" + book.getBookCover()));
			}else {
				helper.addInline("image2",
						new File("E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\Book\\book_dummy.jpg" ));
			}
			
			emailSender.send(message);
			System.out.println("email sent successfully to "+user.getEmail());
			
		} catch (Exception e) {
			System.out.println("exception in reservationAvailableMailSender");
			System.out.println(e.getMessage());
		}

	}
}
