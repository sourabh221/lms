package com.app.controller.librarian;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookDto;
import com.app.dto.OtherDto;
import com.app.dto.ResultDto;
import com.app.pojos.CheckOutBook;
import com.app.pojos.CheckOutBookHistory;
import com.app.pojos.Library;
import com.app.pojos.ReserveBook;
import com.app.pojos.ReserveBookHistory;
import com.app.pojos.ReturnBook;
import com.app.service.CheckOutBookServiceImpl;
import com.app.service.LibraryServiceImpl;
import com.app.service.ReserveBookHistoryServiceImpl;


@RestController
@RequestMapping("/librarian/checkOutBook")
@CrossOrigin("http://localhost:3050")
public class LibrarianCheckOutBookController {
	
	@Autowired
	LibraryServiceImpl libraryServiceImpl;

	@Autowired
	CheckOutBookServiceImpl checkOutBookServiceImpl;
	
	@Autowired
	ReserveBookHistoryServiceImpl reserveBookHistoryServiceImpl;
	
	@Autowired
	private JavaMailSender emailSender;
	
	
	public LibrarianCheckOutBookController() {
		System.out.println("in ctor of "+getClass().getName());
	}
	
	
	
	
	@PutMapping("/check-out-by-librarian")
	public ResponseEntity<?> checkOutBookByLibrarian(@RequestBody OtherDto otherDto){
		System.out.println("in method of checkOutBookByLibrarian of "+getClass().getName()+" "+otherDto.getId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			int id=(Integer)otherDto.getId();
			CheckOutBook c=checkOutBookServiceImpl.getCheckOutBookById(id);
			if(c!=null) {
				if(c.getUserCheckedOut()==1) {
					c.setLibCheckedOut(1);
					c.setCheckOutDate(LocalDate.now());
					c.getReservationHistory().addCheckOutBookHistory(new CheckOutBookHistory(c.getId(), LocalDate.now(),LocalDate.now().plusDays(c.getReservationHistory().getPeriod()),true));
					c.getReservationHistory().addReturnBook(new ReturnBook(LocalDate.now().plusDays(c.getReservationHistory().getPeriod())));
					CheckOutBook c1=checkOutBookServiceImpl.addCheckOutBook(c);
					if(c1!=null) {
						checkOutBookServiceImpl.deleteCheckOutBook(id);
						
						result.setData(c1.getReservationHistory().getBookDetails().getBook().getBookTitle()+" book checked out successfully by "+c1.getReservationHistory().getUser().getFirstName()+" "+c1.getReservationHistory().getUser().getLastName());
						result.setStatus("success");
						sendBookIssuedEmail(c1.getReservationHistory());
					}else {
						result.setData("something went wrong while checking out");
					}
				}else {
					result.setData("user is not checked out the book");
				}
			}else {
				result.setData("check out book id is invalid");
			}
		} catch (Exception e) {
			System.out.println("exception caught in checkOutBookByLibrarian of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	
	public void sendBookIssuedEmail(ReserveBookHistory book) {
		System.out.println("in method of sendBookIssuedEmail of "+getClass().getName());
		try {
			String pathToAttachment = "E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Template\\book_issued_notification.html";
			File file = new File(pathToAttachment);
			
			if(book!=null) {
				BufferedReader reader = new BufferedReader(new FileReader(file));
				String line = reader.readLine();
				String content = "";
				while (line != null) {
					content = content + line + System.lineSeparator();

					line = reader.readLine();
				}
				reader.close();
				content = content.replaceAll("firstName", book.getUser().getFirstName());
				content = content.replaceAll("lastName", book.getUser().getLastName());
				content = content.replaceAll("bookTitle", book.getBookDetails().getBook().getBookTitle());
				content = content.replaceAll("reservationId", String.valueOf(book.getReservationId()));
				content = content.replaceAll("returnDate",
						LocalDate.now().plusDays(book.getPeriod()).toString());
				MimeMessage message = emailSender.createMimeMessage();

				MimeMessageHelper helper = new MimeMessageHelper(message, true);

				helper.setFrom("sourabhthote22@gmail.com");
				helper.setTo(book.getUser().getEmail());
				helper.setSubject("booked issued notification of  "
						+ book.getBookDetails().getBook().getBookTitle());
				helper.setText(content, true);
				helper.addInline("image1",
						new File("E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Template\\welcome.jpg"));
				if (book.getBookDetails().getBook().getBookCover() != null) {
					helper.addInline("image2", new File("E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\Book\\"
							+ book.getBookDetails().getBook().getBookCover()));
				}else {
					helper.addInline("image2", new File("E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\Book\\book_dummy.jpg"));
				}
					
				emailSender.send(message);
				System.out.println("issued notification mail sent successfully");
		}
		} catch (Exception e) {
			System.out.println("exception caught in sendBookIssuedEmail");
			System.out.println(e.getMessage());
		}
		
	}

}
