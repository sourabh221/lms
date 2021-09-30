package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.LibraryBookDetails;
import com.app.pojos.ReserveBook;
import com.app.pojos.User;

public interface ReserveBookRepository extends JpaRepository<ReserveBook, Integer> {
Optional<List<ReserveBook>> findByBookDetailsOrderByReservationDateAsc(LibraryBookDetails lbd);
Optional<List<ReserveBook>> findByBookDetailsAndActiveOrderByReservationDateAsc(LibraryBookDetails lbd,int active);
Optional<List<ReserveBook>> findByUser(User user);

@Query(value="select * from reserve_book_tbl where library=?1  ",nativeQuery = true)
Optional<List<ReserveBook>> findByLibraryId(int id);

@Modifying
@Query(value="delete from reserve_book_tbl where reservation_id=?1",nativeQuery = true)
void deleteByReserveBookId(int id); 

}
