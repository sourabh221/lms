package com.app.service;

import java.util.List;

import com.app.pojos.LibraryBookDetails;
import com.app.pojos.ReserveBook;
import com.app.pojos.User;

public interface IReserveBookService {
List<ReserveBook> getReservationsByLBD(LibraryBookDetails lbd);
List<ReserveBook> getReservationsByUser(User u);
ReserveBook getReservationById(int id);
void deleteReservation(int id);
ReserveBook addReservation(ReserveBook reserveBook);
List<ReserveBook> getReservationsByLibrary(int libraryId);
}
