package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.app.pojos.Book;

public interface IBookService {
Book addBook(Book book);
Book getBySerialNo(UUID id);
Book uploadBookCover(UUID id,String fileName);
List<Book> getBooksByTitlestring(String titleString);
}
