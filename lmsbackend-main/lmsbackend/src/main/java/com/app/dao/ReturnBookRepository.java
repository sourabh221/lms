package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.ReturnBook;

public interface ReturnBookRepository extends JpaRepository<ReturnBook, Integer> {
@Modifying
@Query(value = " delete from return_book_tbl where id=?1",nativeQuery = true)
void deleteReturnBookById(int id);
}
