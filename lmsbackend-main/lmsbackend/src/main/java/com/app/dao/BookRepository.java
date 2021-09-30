package com.app.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
	Optional<Book> findBySerialNo(UUID id);
	@Query(value="select * from books_tbl where book_title LIKE %?1%",nativeQuery = true)
   Optional<List<Book>> findByTitleSubStrings(String titleString);
}
