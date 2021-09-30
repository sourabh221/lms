package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ReserveBookHistoryRepository;
import com.app.pojos.ReserveBook;
import com.app.pojos.ReserveBookHistory;
import com.app.pojos.User;
@Service
@Transactional
public class ReserveBookHistoryServiceImpl implements IReserveBookHistoryService {
	
	@Autowired
	ReserveBookHistoryRepository reserveBookHistoryRepository;

	public ReserveBookHistoryServiceImpl() {
		System.out.println("in constructor of "+getClass().getName());
	}

	@Override
	public ReserveBookHistory addReserBookHistory(ReserveBookHistory reserveBookHistory) {
		
		return null;
	}

	@Override
	public List<ReserveBookHistory> getReservationHistoryByUser(User user) {
		System.out.println("in method getReservationHistoryByUser of "+getClass().getName());
		try {
			Optional<List<ReserveBookHistory>> optional=reserveBookHistoryRepository.findByUser(user);
			if(optional.isPresent()) {
				return optional.get();
			}
		} catch (Exception e) {
			System.out.println("exception caught in getReservationHistoryByUser of"+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public List<ReserveBookHistory> getReservationHistoryByLibraryId(int id) {
		System.out.println("in method getReservationHistoryByLibraryId of "+getClass().getName()+" "+id);
		try {
			Optional<List<ReserveBookHistory>> optional=reserveBookHistoryRepository.findByLibraryId(id);
			if(optional.isPresent()) {
				return optional.get();
			}
		} catch (Exception e) {
			System.out.println("exception caught in getReservationHistoryByLibraryId of"+getClass().getName());
			System.out.println(e.getMessage());
		}
		return null;
	}

}
