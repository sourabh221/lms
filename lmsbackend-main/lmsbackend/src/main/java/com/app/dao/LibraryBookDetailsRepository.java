package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.pojos.Book;
import com.app.pojos.LibraryBookDetails;
import com.app.pojos.LibraryBookId;

public interface LibraryBookDetailsRepository extends JpaRepository<LibraryBookDetails, LibraryBookId>{
Optional<LibraryBookDetails> findById(LibraryBookId lib);
@Query(value=" select b.* from library_book_details_tbl l inner join books_tbl b  on l.book_id=b.id where l.library_id=?1",nativeQuery = true)
Optional<List<Book>> findBooksByLibraryId(int id);
}
