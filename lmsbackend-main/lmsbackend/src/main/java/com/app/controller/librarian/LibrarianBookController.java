package com.app.controller.librarian;

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
import com.app.pojos.User;
import com.app.service.BookServiceImpl;
import com.app.service.LibraryBookDetailsServiceImpl;
import com.app.service.LibraryServiceImpl;
import com.app.utils.UserUtils;

@RestController
@CrossOrigin("http://localhost:3050")
@RequestMapping("/librarian/book")
public class LibrarianBookController {

	@Autowired
	LibraryBookDetailsServiceImpl libraryBookDetailsServiceImpl;
	
	@Autowired
	LibraryServiceImpl libraryServiceImpl;
	
	@Autowired
	BookServiceImpl bookServiceImpl;
	
	String location = "E:\\Project_LMS\\lmsbackend-main\\lmsbackend-main\\Images\\Book";
	
	public LibrarianBookController() {
		System.out.println("in constructor of "+getClass().getName());
	}

	
	@PostMapping("/add-book")
	public ResponseEntity<?> addBook(@RequestBody BookDto book){
		System.out.println("in method  addBook of "+getClass().getName()+" "+book.getBookAuthor());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			if(book.getLibraryId()!=null) {
				Library lib=libraryServiceImpl.GetLibraryBySerialNo(book.getLibraryId());
				if(lib!=null) {
					if(book.getBookId()==null) {
						System.out.println("book id is not given");
						Book b=new Book(book.getiSBN(),book.getBookTitle(),book.getBookAuthor(),book.getBookDescription());
						Book b1=bookServiceImpl.addBook(b);
						if(b1!=null) {
							LibraryBookDetails lbd=new LibraryBookDetails(new LibraryBookId(b1.getId(),lib.getLibraryId()),1,1);
							lbd.setLibrary(lib);
							lbd.setBook(b1);
							BookDetails bookDetails=new BookDetails(book.getiSBN());
							lbd.addBookDetail(bookDetails);
							LibraryBookDetails lbdResult=libraryBookDetailsServiceImpl.addBook(lbd);
							if(lbdResult!=null) {
								System.out.println("book serial no "+lbdResult.getBook().getSerialNo());
								result.setStatus("success");
								result.setData(lbdResult);
							}else {
								result.setData("something went wrong while adding the new book");
							}
						}else {
							result.setData("something went wrong while adding book");
						}
					}else {
						System.out.println("book id is "+book.getBookId());
						Book b=bookServiceImpl.getBySerialNo(book.getBookId());
						if(b!=null) {
							
							LibraryBookDetails lbd=libraryBookDetailsServiceImpl.getByLibraryBookId(new LibraryBookId(b.getId(),lib.getLibraryId()));
							
							if(lbd!=null) {
								lbd.setAvailableBooks(lbd.getAvailableBooks()+1);
								lbd.setTotNoOfBooks(lbd.getTotNoOfBooks()+1);
								BookDetails bookDetails=new BookDetails(lbd.getBook().getiSBN());
								lbd.addBookDetail(bookDetails);
								LibraryBookDetails lbd1=libraryBookDetailsServiceImpl.addBook(lbd);
								if(lbd1!=null) {
									result.setData("book added successfully");
									result.setStatus("success");
								}else {
									result.setData("something went wrong while incrementing books");
								}
							}else {
								LibraryBookDetails lbd1=new LibraryBookDetails(new LibraryBookId(b.getId(),lib.getLibraryId()),1,1);
								lbd1.setLibrary(lib);
								lbd1.setBook(b);
								BookDetails bookDetails=new BookDetails(b.getiSBN());
								lbd1.addBookDetail(bookDetails);
								LibraryBookDetails lbdResult=libraryBookDetailsServiceImpl.addBook(lbd1);
								if(lbdResult!=null) {
									System.out.println("book serial no "+lbdResult.getBook().getSerialNo());
									result.setStatus("success");
									result.setData("book added successfully");
								}else {
									result.setData("something went wrong while adding the old book in library");
								}
							}
						}else {
							result.setData("something went wrong while finding the book");
						}
						
					}
				}else {
					result.setData("library is not found");
				}
			}else {
				result.setData("library id is not given");
			}
		} catch (Exception e) {
			System.out.println("exception caught in method addBook of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/bookcover-upload")
	public ResponseEntity<?> imageUpload(@RequestHeader UUID id, @RequestBody MultipartFile file) throws Exception {

		System.out.println("in image uploading function of " + getClass().getName());
		ResultDto result=new ResultDto("error","something went wrong while uploading image");
		try {
			System.out.println("file name "+file.getOriginalFilename());
			String fileName=file.getOriginalFilename();
			Path path = Paths.get(location, file.getOriginalFilename());
			
			File temp=new File(path.toString());
			System.out.println(temp.exists());
			while(temp.exists() ) {
				String name=file.getOriginalFilename();
				int index=name.indexOf('.');
				int max=10000,min=99999;
				int b = (int)(Math.random()*(max-min+1)+min);  
				int c = (int)(Math.random()*(max-min+1)+min);  
				 fileName=name.substring(0,index)+b+c+name.substring(index);
				 System.out.println("filename "+fileName);
				path = Paths.get(location, fileName);
				temp=new File(path.toString());
			}
			Book b=bookServiceImpl.uploadBookCover(id, fileName);
			if(b!=null) {
				file.transferTo(new File(location,b.getBookCover()));
				result.setData("image uploaded successfully");
				result.setStatus("success");
			}
		} catch (Exception e) {
			result.setData(e.getMessage());
			System.out.println("exception in upload cover "+e.getMessage());
		}
		return ResponseEntity.ok(result);
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
