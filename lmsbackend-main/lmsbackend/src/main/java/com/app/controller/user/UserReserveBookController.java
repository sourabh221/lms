package com.app.controller.user;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalDate;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookDto;
import com.app.dto.OtherDto;
import com.app.dto.ResultDto;
import com.app.pojos.Book;
import com.app.pojos.CheckOutBook;
import com.app.pojos.Library;
import com.app.pojos.LibraryBookDetails;
import com.app.pojos.LibraryBookId;
import com.app.pojos.ReserveBook;
import com.app.pojos.ReserveBookHistory;
import com.app.pojos.User;
import com.app.service.BookServiceImpl;
import com.app.service.LibraryBookDetailsServiceImpl;
import com.app.service.LibraryServiceImpl;
import com.app.service.ReserveBookServiceImpl;
import com.app.service.UserServiceImpl;

@RestController
@RequestMapping("/user/reserveBook")
@CrossOrigin("http://localhost:3060")
public class UserReserveBookController {

	@Autowired
	UserServiceImpl userServiceImpl;
	
	@Autowired
	BookServiceImpl bookServiceImpl;
	
	@Autowired
	LibraryServiceImpl libraryServiceImpl;
	
	@Autowired
	LibraryBookDetailsServiceImpl libraryBookDetailsServiceImpl;
	
	@Autowired
	ReserveBookServiceImpl reserveBookServiceImpl;
	
	@Autowired
	private JavaMailSender emailSender;
	
	public UserReserveBookController() {
		System.out.println("in ctor of "+getClass().getName());
	}

	@PostMapping("/add-reservation")
	public ResponseEntity<?> addBookReservation(@RequestBody BookDto bookDto){
		System.out.println("in addBookReservation method of "+getClass().getName()+" "+bookDto.getUserId());
		ResultDto result=new ResultDto("error","something went wrong");
		
		try {
			if(bookDto.getBookId()!=null && bookDto.getLibraryId()!=null&&bookDto.getUserId()!=null) {
				User u=userServiceImpl.getUserBySerialNo(bookDto.getUserId());
				if(u!=null) {
					Library lib=libraryServiceImpl.GetLibraryBySerialNo(bookDto.getLibraryId());
					if(lib!=null) {
						Book book=bookServiceImpl.getBySerialNo(bookDto.getBookId());
						if(book!=null) {
							LibraryBookDetails bookDetails=libraryBookDetailsServiceImpl.getByLibraryBookId(new LibraryBookId(book.getId(),lib.getLibraryId()));
							if(bookDetails!=null) {
								/*ReserveBook reservation=new ReserveBook();
								reservation.setPeriod(bookDto.getPeriod());
								    reservation.setUser(u);
									reservation.setBookDetails(bookDetails);
									ReserveBook r1=reserveBookServiceImpl.addReservation(reservation);*/
								ReserveBook reservation=new ReserveBook();
								if(bookDto.getPeriod()>7) {
									reservation.setPeriod(7);
								}else {
									reservation.setPeriod(bookDto.getPeriod());
								}
								    reservation.setUser(u);
								    bookDetails.addReservation(reservation);
								    LibraryBookDetails lbd=libraryBookDetailsServiceImpl.addBook(bookDetails);
									if(lbd!=null) {
										result.setStatus("success");
										result.setData("reservation has been made successfully");
										checkForAvailability(bookDetails);
									}else {
										result.setData("while adding reservation something went wrong");
									}
								
										
							}else {
								result.setData("library book details is not found");
							}
						}else {
							result.setData("book is not found");
						}
					}else {
						result.setData("library is not found");
					}
				}else {
					result.setData("user is not found");
				}
			}else {
				result.setData("given information is insufficient");
			}
		} catch (Exception e) {
			System.out.println("exception caught in addBookReservation of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	@PutMapping("/get-reservations-of-user")
	public ResponseEntity<?> getReservationsOfUser(@RequestBody BookDto bookDto){
		System.out.println("in getReservationsOfUser method of "+getClass().getName()+" "+bookDto.getUserId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			User user=userServiceImpl.getUserBySerialNo(bookDto.getUserId());
			if(user!=null) {
				List<ReserveBook> reservations=reserveBookServiceImpl.getReservationsByUser(user);
				if(reservations!=null) {
					result.setStatus("success");
					result.setData(reservations);
				}else {
					result.setData("reservations not available");
				}
			}else {
				result.setData("user not found");
			}
		} catch (Exception e) {
			System.out.println("exception caught in getReservationsOfUser of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	
	@PutMapping("/delete-reservation")
	public ResponseEntity<?> deleteReservation(@RequestBody OtherDto otherDto){
		System.out.println("in getReservationsOfUser method of "+getClass().getName()+" "+otherDto.getId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			int id=(Integer)otherDto.getId();
			reserveBookServiceImpl.deleteReservation(id);
			result.setData("reservation deleted successfully");
			result.setStatus("success");
		} catch (Exception e) {
			System.out.println("exception caught in deleteReservation of "+getClass().getName());
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
