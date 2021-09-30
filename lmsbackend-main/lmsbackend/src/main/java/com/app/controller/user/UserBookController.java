package com.app.controller.user;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.BookDto;
import com.app.dto.BookImageDto;
import com.app.dto.LibraryBookDetailsImageDto;
import com.app.dto.ResultDto;
import com.app.pojos.Book;
import com.app.pojos.BookDetails;
import com.app.pojos.Library;
import com.app.pojos.LibraryBookDetails;
import com.app.pojos.LibraryBookId;
import com.app.service.BookServiceImpl;
import com.app.service.LibraryBookDetailsServiceImpl;
import com.app.service.LibraryServiceImpl;
import com.app.utils.UserUtils;

@RestController
@CrossOrigin("http://localhost:3060")
@RequestMapping("/user/book")
public class UserBookController {

	@Autowired
	LibraryBookDetailsServiceImpl libraryBookDetailsServiceImpl;
	
	@Autowired
	LibraryServiceImpl libraryServiceImpl;
	
	@Autowired
	BookServiceImpl bookServiceImpl;
	
	String location = "E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\Book";
	
	public UserBookController() {
		System.out.println("in constructor of "+getClass().getName());
	}

	
	@PostMapping("/get-books-by-titleString")
	public ResponseEntity<?> getBooksByTitleString(@RequestBody BookDto bookDto){
		System.out.println("in getBooksByTitleString function of " + getClass().getName()+" "+bookDto.getBookTitle());
		ResultDto result=new ResultDto("error","something went wrong ");
		try {
			List<Book> books=bookServiceImpl.getBooksByTitlestring(bookDto.getBookTitle());
			if(books!=null && books.size()!=0) {
				List<BookImageDto> bookResult=new ArrayList<BookImageDto>();
				for (Book book : books) {
					bookResult.add(new BookImageDto(book,UserUtils.GetImage(location, book.getBookCover(), "book_dummy.jpg")));
				}
				result.setData(bookResult);
				result.setStatus("success");
			}else {
				result.setData("no book available in record add the new one");
			}
		} catch (Exception e) {
			System.out.println("exception in getBooksByTitleString"+e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/get-books-by-library")
	public ResponseEntity<?> getBooksByLibrary(@RequestBody BookDto bookDto){
		System.out.println("in getBooksByLibrary function of " + getClass().getName()+" "+bookDto.getBookTitle());
		ResultDto result=new ResultDto("error","something went wrong ");
		try {
			Library lib=libraryServiceImpl.GetLibraryBySerialNo(bookDto.getLibraryId());
			if(lib!=null) {
				List<LibraryBookDetailsImageDto> books=new ArrayList<LibraryBookDetailsImageDto>();
				for (LibraryBookDetails lbd : lib.getLibBookDetails()) {
					books.add(new LibraryBookDetailsImageDto(lbd,UserUtils.GetImage(location, lbd.getBook().getBookCover(), "book_dummy.jpg")));
				}
				result.setStatus("success");
				result.setData(books);
			}else {
				result.setData("library is not found");
			}
		} catch (Exception e) {
			System.out.println("exception in getBooksByLibrary"+e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	

}
