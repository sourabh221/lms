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
import com.app.dto.ResultDto;
import com.app.pojos.Library;
import com.app.pojos.ReserveBook;
import com.app.pojos.User;
import com.app.service.LibraryBookDetailsServiceImpl;
import com.app.service.LibraryServiceImpl;
import com.app.service.ReserveBookServiceImpl;

@RestController
@RequestMapping("/librarian/reserveBook")
@CrossOrigin("http://localhost:3050")
public class LibrarianReserveBookController {
	
	@Autowired
	LibraryServiceImpl libraryServiceImpl;

	@Autowired
	LibraryBookDetailsServiceImpl libraryBookDetailsServiceImpl;
	
	@Autowired
	ReserveBookServiceImpl reserveBookServiceImpl;
	
	public LibrarianReserveBookController() {
		System.out.println("in ctor of "+getClass().getName());
	}
	
	@PutMapping("/get-reservations-of-library")
	public ResponseEntity<?> getReservationsOfLibrary(@RequestBody BookDto bookDto){
		System.out.println("in getReservationsOfLibrary method of "+getClass().getName()+" "+bookDto.getUserId());
		ResultDto result=new ResultDto("error","something went wrong");
		try {
			Library lib=libraryServiceImpl.GetLibraryBySerialNo(bookDto.getLibraryId());
			if(lib!=null) {
				System.out.println("library id "+lib.getLibraryId());
				List<ReserveBook> reservations=reserveBookServiceImpl.getReservationsByLibrary(lib.getLibraryId());
				if(reservations!=null) {
					result.setData(reservations);
					result.setStatus("success");
				}else {
					result.setData("something went wrong while fetching reservations");
				}
			}else {
				result.setData("library is not found");
			}
		} catch (Exception e) {
			System.out.println("exception caught in getReservationsOfLibrary of "+getClass().getName());
			System.out.println(e.getMessage());
			result.setData(e.getMessage());
		}
		return ResponseEntity.ok(result);
	}

}
