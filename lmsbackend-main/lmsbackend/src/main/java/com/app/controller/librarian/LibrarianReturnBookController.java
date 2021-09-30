package com.app.controller.librarian;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.app.pojos.ReturnBook;
import com.app.pojos.ReturnBookHistory;
import com.app.pojos.User;
import com.app.service.LibraryBookDetailsServiceImpl;
import com.app.service.LibraryServiceImpl;
import com.app.service.ReserveBookServiceImpl;
import com.app.service.ReturnBookServiceImpl;
import com.app.service.UserServiceImpl;
import com.app.utils.UserUtils;

@RestController
@RequestMapping("/librarian/returnBook")
@CrossOrigin("http://localhost:3050")
public class LibrarianReturnBookController {

	@Autowired
	ReturnBookServiceImpl returnBookServiceImpl;
	
	@Autowired
	UserServiceImpl userServiceImpl;
	
	@Autowired
	LibraryServiceImpl libraryServiceImpl;
	
	
	@Autowired
	LibraryBookDetailsServiceImpl libraryBookDetailsServiceImpl;
	
	@Autowired
	ReserveBookServiceImpl reserveBookServiceImpl;
	
	@Autowired
	JavaMailSender emailSender;
	
	
	public LibrarianReturnBookController() {
		System.out.println("in ctor of "+getClass().getName());
	}
	
	@PutMapping("/return-book-by-librarian")
	public ResponseEntity<?> returnBookByLibrarian(@RequestBody BookDto bookDto){
		System.out.println("in method returnBookByLibrarian of "+getClass().getName()+" "+bookDto.getId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			User user=userServiceImpl.getUserBySerialNo(bookDto.getUserId());
			if(user!=null) {
				ReturnBook returnBook=returnBookServiceImpl.getReturnBookById(bookDto.getId());
				if(returnBook!=null) {
					returnBook.getReservationHistory().getBookDetails().setAvailableBooks(returnBook.getReservationHistory().getBookDetails().getAvailableBooks()+1);
					returnBook.setLibIsReturn(1);
					returnBook.getReservationHistory().addReturnBookHistory(new ReturnBookHistory(returnBook.getId(), returnBook.getLastDateToReturn(), LocalDate.now(),user.getUserId()));
					ReturnBook r1=returnBookServiceImpl.addReturnBook(returnBook);
					if(r1!=null) {
						returnBookServiceImpl.deleteReturnBookById(r1.getId());
						checkForAvailability(returnBook.getReservationHistory().getBookDetails());
						result.setData("book returned successfully");
						result.setStatus("success");
					}else {
						result.setData("while updating available books and inserting return book history something went wrong");
					}
					
				}else {
					result.setData("invalid return book id");
				}
				
			}else {
				result.setData("user not found");
			}
			
		} catch (Exception e) {
			System.out.println("exception caught in returnBookByLibrarian of "+getClass().getName());
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
	
	@PutMapping("/send-notifications-to-user")
	public ResponseEntity<?> sendNotificationsToUser(@RequestBody BookDto bookDto){
		System.out.println("in sendNotificationsToUser method of "+getClass().getName());
		ResultDto result=new ResultDto("error","something went wrong");
		int count=0;
		try {
			Library lib=libraryServiceImpl.GetLibraryBySerialNo(bookDto.getLibraryId());
			if(lib!=null) {
				Map<String,User>  users=lib.getUsers();
				for (Map.Entry<String, User> entry : users.entrySet()) {
					User user=entry.getValue();
					Long fine=0l;
					for (ReserveBookHistory	 history : user.getReservationsHistory()) {
						if(history.getReturnBook()!=null) {
							Period period=Period.between(history.getReturnBook().getLastDateToReturn(), LocalDate.now());
							long fine1=UserUtils.calculateFine(period.getDays())>0?UserUtils.calculateFine(period.getDays()):0;	
							if(fine1!=0) {
								fine+=fine1;
								if(history.getReturnBook().getNotificationSentOn()!=LocalDate.now()) {
									sendEmailsForDue(history, fine1);
									ReturnBook returnBook=history.getReturnBook();
									returnBook.setNotificationSentOn(LocalDate.now());
									ReturnBook r1=returnBookServiceImpl.addReturnBook(returnBook);
									if(r1!=null) {
										System.out.println("notification sent successfully and return book updated successfully");
									}
								}
							}
						}
					}
					if(fine!=0) {
						count++;
						user.setFine(fine);
						User u=userServiceImpl.addUser(user);
						if(u!=null) {
							System.out.println("fine updated successfully");
						}
					}
				}
				
				result.setData("mail sent to "+count+" users successfully");
				result.setStatus("success");
			}
		} catch (Exception e) {
			result.setData(e.getMessage());
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	
	public void sendEmailsForDue(ReserveBookHistory rHistory,long fine) throws Exception {
		String pathToAttachment = "E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Template\\book_issued_notification.html\\fine_notification.html";
		File file = new File(pathToAttachment);
		BufferedReader reader = new BufferedReader(new FileReader(file));
		String line = reader.readLine();
		String content = "";
		while (line != null) {
			content = content + line + System.lineSeparator();

			line = reader.readLine();
		}
		reader.close();
		content = content.replaceAll("firstName", rHistory.getUser().getFirstName());
		content = content.replaceAll("lastName", rHistory.getUser().getLastName());
		content = content.replaceAll("bookTitle", rHistory.getBookDetails().getBook().getBookTitle());
		content = content.replaceAll("reservationId", String.valueOf(rHistory.getReservationId()));
		content = content.replaceAll("returnDate",
				LocalDate.now().plusDays(rHistory.getPeriod()).toString());
		content = content.replaceAll("fine", String.valueOf(fine));
		MimeMessage message = emailSender.createMimeMessage();

		MimeMessageHelper helper = new MimeMessageHelper(message, true);

		helper.setFrom("sourabhthote22@gmail.com");
		helper.setTo(rHistory.getUser().getEmail());
		helper.setSubject(" notification of returning the book  "
				+ rHistory.getBookDetails().getBook().getBookTitle());
		helper.setText(content, true);
		helper.addInline("image1",
				new File("E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Template\\welcome.jpg"));
		if (rHistory.getBookDetails().getBook().getBookCover() != null) {
			helper.addInline("image2", new File("E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\Book\\"
					+ rHistory.getBookDetails().getBook().getBookCover()));
		}else {
			helper.addInline("image2", new File("E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\Book\\book_dummy.jpg"));
		}
		emailSender.send(message);
	}
	
	

}
