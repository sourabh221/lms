package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ReserveBookRepository;
import com.app.pojos.LibraryBookDetails;
import com.app.pojos.ReserveBook;
import com.app.pojos.User;

@Service
@Transactional
public class ReserveBookServiceImpl implements IReserveBookService {
	@Autowired
	ReserveBookRepository reserveBookRepository;

	public ReserveBookServiceImpl() {
		System.out.println("in constructor of " + getClass().getName());
	}
	
	@Override
	public ReserveBook addReservation(ReserveBook reserveBook) {
		System.out.println("in addReservation of " + getClass().getName() + " " + reserveBook.getBookDetails().getId());
		try {
			return reserveBookRepository.save(reserveBook);
		} catch (Exception e) {
			System.out.println("exception caught in addReservation " + getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public List<ReserveBook> getReservationsByLBD(LibraryBookDetails lbd) {
		System.out.println("in getReservationsByLBD of " + getClass().getName() + " " + lbd.getBook().getBookTitle());
		try {
			Optional<List<ReserveBook>> optional = reserveBookRepository.findByBookDetailsAndActiveOrderByReservationDateAsc(lbd, 0);
			
			if (optional.isPresent()) {
				return optional.get();
			}

		} catch (Exception e) {
			System.out.println("exception caught in getReservationsByLBD " + getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public ReserveBook getReservationById(int id) {
		System.out.println("in getReservationById of " + getClass().getName() + " " + id);
		try {
			Optional<ReserveBook> optional = reserveBookRepository.findById(Integer.valueOf(id));
			if (optional.isPresent()) {
				return optional.get();
			}

		} catch (Exception e) {
			System.out.println("exception caught in getReservationById " + getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public void deleteReservation(int id) {
		System.out.println("in deleteReservation of " + getClass().getName() + " " + id);
		try {
			reserveBookRepository.deleteByReserveBookId(id);
		} catch (Exception e) {
			System.out.println("exception caught in deleteReservation " + getClass().getName());
			System.out.println(e.getMessage());
		}

	}

	@Override
	public List<ReserveBook> getReservationsByUser(User u) {
		System.out.println("in getReservationsByUser of " + getClass().getName() + " " + u.getEmail());
		try {
			Optional<List<ReserveBook>> optional = reserveBookRepository.findByUser(u);
			if (optional.isPresent()) {
				return optional.get();
			}

		} catch (Exception e) {
			System.out.println("exception caught in getReservationsByUser " + getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public List<ReserveBook> getReservationsByLibrary(int libraryId) {
		System.out.println("in getReservationsByLibrary of " + getClass().getName() + " " + libraryId);
		try {
			Optional<List<ReserveBook>> optional = reserveBookRepository.findByLibraryId(libraryId);
			if (optional.isPresent()) {
				return optional.get();
			}

		} catch (Exception e) {
			System.out.println("exception caught in getReservationsByLibrary " + getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	

}
