package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ReturnBookRepository;
import com.app.pojos.ReturnBook;


@Service
@Transactional
public class ReturnBookServiceImpl implements IReturnBookService {
	
	@Autowired
	ReturnBookRepository returnBookRepository;

	public ReturnBookServiceImpl() {
		System.out.println("in ctor of "+getClass().getName());
	}
	
	@Override
	public ReturnBook addReturnBook(ReturnBook returnBook) {
		System.out.println("in addReturnBook of " + getClass().getName() + " " + returnBook.getId());
		try {
			return returnBookRepository.save(returnBook);
			
		} catch (Exception e) {
			System.out.println("exception caught in addReturnBook " + getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}


	@Override
	public ReturnBook getReturnBookById(int id) {
		System.out.println("in getReturnBookById of " + getClass().getName() + " " + id);
		try {
			Optional<ReturnBook> optional=returnBookRepository.findById(id);
			if(optional.isPresent()) {
				return optional.get();
			}
			
		} catch (Exception e) {
			System.out.println("exception caught in getReturnBookById " + getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public void deleteReturnBookById(int id) {
		System.out.println("in deleteReturnBookById of " + getClass().getName() + " " + id);
		try {
			returnBookRepository.deleteReturnBookById(id);
			
		} catch (Exception e) {
			System.out.println("exception caught in deleteReturnBookById " + getClass().getName());
			System.out.println(e.getMessage());
		}
		
	}

	
}
