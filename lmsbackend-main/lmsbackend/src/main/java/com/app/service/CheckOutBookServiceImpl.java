package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CheckOutBookRepository;
import com.app.pojos.CheckOutBook;

@Transactional
@Service
public class CheckOutBookServiceImpl implements ICheckOutBookService {
	
	@Autowired
	CheckOutBookRepository checkOutBookRepository;

	public CheckOutBookServiceImpl() {
		System.out.println("in ctor of "+getClass().getName());
	}

	@Override
	public CheckOutBook addCheckOutBook(CheckOutBook checkOutBook) {
		System.out.println("in method addCheckOutBook of "+getClass().getName());
		try {
			return checkOutBookRepository.save(checkOutBook);
		} catch (Exception e) {
			System.out.println("exception caught in method addCheckOutBook of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public CheckOutBook getCheckOutBookById(int id) {
		System.out.println("in method getCheckOutBookById of "+getClass().getName());
		try {
			Optional<CheckOutBook> optional=checkOutBookRepository.findById(id);
			if(optional.isPresent()) {
				return optional.get();
			}
		} catch (Exception e) {
			System.out.println("exception caught in method getCheckOutBookById of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public void deleteCheckOutBook(int id) {
		System.out.println("in method deleteCheckOutBook of "+getClass().getName());
		try {
		checkOutBookRepository.deleteByCheckOutBookId(id);
		} catch (Exception e) {
			System.out.println("exception caught in method deleteCheckOutBook of "+getClass().getName());
			System.out.println(e.getMessage());
		}
		
	}

}
