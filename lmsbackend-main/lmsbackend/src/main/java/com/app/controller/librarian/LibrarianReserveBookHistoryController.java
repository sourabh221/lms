package com.app.controller.librarian;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookDto;
import com.app.dto.Email_UUID_dto;
import com.app.dto.ResultDto;
import com.app.pojos.Library;
import com.app.pojos.ReserveBookHistory;
import com.app.pojos.User;
import com.app.service.LibraryServiceImpl;
import com.app.service.ReserveBookHistoryServiceImpl;

@RestController
@RequestMapping("/librarian/reserveBookHistory")
@CrossOrigin("http://localhost:3050")
public class LibrarianReserveBookHistoryController {

	@Autowired
	ReserveBookHistoryServiceImpl reserveBookHistoryServiceImpl;
	
	@Autowired
	LibraryServiceImpl libraryServiceImpl;
	
	public LibrarianReserveBookHistoryController() {
		System.out.println("in ctor of "+getClass().getName());
	}

	
	@PutMapping("/get-reservation-history")
	public ResponseEntity<?> getReservationHistoryByLibrary(@RequestBody BookDto bookDto){
		System.out.println("in method of getReservationHistoryByUser of "+getClass().getName()+" serialNo "+bookDto.getLibraryId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			Library lib=libraryServiceImpl.GetLibraryBySerialNo(bookDto.getLibraryId());
			if(lib!=null) {
				List<ReserveBookHistory> reservations=reserveBookHistoryServiceImpl.getReservationHistoryByLibraryId(lib.getLibraryId());
				if(reservations!=null) {
					result.setData(reservations);
					result.setStatus("success");
				}else {
					result.setData("reservation histories not available");
				}
			}else {
				result.setData("library not found");
			}
			
		} catch (Exception e) {
			System.out.println("exception caught in getReservationHistoryByLibrary of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}
}
