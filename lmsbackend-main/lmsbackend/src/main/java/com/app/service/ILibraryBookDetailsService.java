package com.app.service;

import java.util.List;

import com.app.pojos.Book;
import com.app.pojos.Library;
import com.app.pojos.LibraryBookDetails;
import com.app.pojos.LibraryBookId;

public interface ILibraryBookDetailsService {
LibraryBookDetails addBook(LibraryBookDetails libBookDetails);
LibraryBookDetails getByLibraryBookId(LibraryBookId id);
List<Book> getBooksByLibraryId(int id);
}
