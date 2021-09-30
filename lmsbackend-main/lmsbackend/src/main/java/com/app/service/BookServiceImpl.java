package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.BookRepository;
import com.app.pojos.Book;
import com.app.pojos.LibraryBookDetails;

@Service
@Transactional
public class BookServiceImpl implements IBookService {

	@Autowired
	BookRepository bookRepository;
	
	public BookServiceImpl() {
		System.out.println("in ctor of "+getClass().getName());
	}

	@Override
	public Book addBook(Book book) {
		System.out.println("in addBook method of "+getClass().getName());
		try {
			return bookRepository.save(book);
		} catch (Exception e) {
			System.out.println("excepion thrown in addBook of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public Book getBySerialNo(UUID id) {
		System.out.println("in getBySerialNo method of "+getClass().getName());
		try {
			Optional<Book> optional=bookRepository.findBySerialNo(id);
			if(optional.isPresent()) {
				return optional.get();
			}
			
		} catch (Exception e) {
			System.out.println("exception thrown in getBySerialNo of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public Book uploadBookCover(UUID id, String fileName) {
		System.out.println("in uploadBookCover method of "+getClass().getName());
		try {
			Optional<Book> optional=bookRepository.findBySerialNo(id);
			if(optional.isPresent()) {
				Book b= optional.get();
				b.setBookCover(fileName);
				return bookRepository.save(b);
				
			}
			
		} catch (Exception e) {
			System.out.println("exception thrown in uploadBookCover of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public List<Book> getBooksByTitlestring(String titleString) {
		System.out.println("in getBooksByTitlestring method of "+getClass().getName());
		try {
			Optional<List<Book>> optional=bookRepository.findByTitleSubStrings(titleString);
			if(optional.isPresent()) {
				return optional.get();
			}
			
		} catch (Exception e) {
			System.out.println("exception thrown in getBooksByTitlestring of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

}
