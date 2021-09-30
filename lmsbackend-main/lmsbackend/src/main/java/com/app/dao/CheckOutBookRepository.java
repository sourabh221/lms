package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.CheckOutBook;

public interface CheckOutBookRepository extends JpaRepository<CheckOutBook, Integer> {
	@Modifying
	@Query(value=" delete from check_out_book_tbl where id=?1",nativeQuery = true)
void deleteByCheckOutBookId(int id);
}
