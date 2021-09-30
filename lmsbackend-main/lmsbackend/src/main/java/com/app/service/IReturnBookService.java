package com.app.service;

import com.app.pojos.ReturnBook;

public interface IReturnBookService {
	ReturnBook addReturnBook(ReturnBook returnBook);
ReturnBook getReturnBookById(int id);
void deleteReturnBookById(int id);
}
