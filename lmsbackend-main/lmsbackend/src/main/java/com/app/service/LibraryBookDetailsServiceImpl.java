package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.LibraryBookDetailsRepository;
import com.app.pojos.Book;
import com.app.pojos.LibraryBookDetails;
import com.app.pojos.LibraryBookId;

@Service
@Transactional
public class LibraryBookDetailsServiceImpl implements ILibraryBookDetailsService {

	@Autowired
	LibraryBookDetailsRepository libraryBookDetailsRepository;
	
	public LibraryBookDetailsServiceImpl() {
		System.out.println("in constructor of "+getClass().getName());
	}

	@Override
	public LibraryBookDetails addBook(LibraryBookDetails libBookDetails) {
		System.out.println("in addBook method of "+getClass().getName());
		try {
			return libraryBookDetailsRepository.save(libBookDetails);
		} catch (Exception e) {
			System.out.println("excepion thrown in addBook of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public LibraryBookDetails getByLibraryBookId(LibraryBookId id) {
		System.out.println("in getByLibraryBookId method of "+getClass().getName());
		try {
			Optional<LibraryBookDetails> optional=libraryBookDetailsRepository.findById(id);
			if(optional.isPresent()) {
				return optional.get();
			}
			
		} catch (Exception e) {
			System.out.println("excepion thrown in getByLibraryBookId of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public List<Book> getBooksByLibraryId(int id) {
		System.out.println("in getBooksByLibraryId method of "+getClass().getName());
		try {
			Optional<List<Book>> optional=libraryBookDetailsRepository.findBooksByLibraryId(id);
			if(optional.isPresent()) {
				return optional.get();
			}
			
		} catch (Exception e) {
			System.out.println("excepion thrown in getBooksByLibraryId of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

}
