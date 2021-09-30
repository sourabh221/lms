package com.app.service;

import com.app.pojos.CheckOutBook;

public interface ICheckOutBookService {
CheckOutBook addCheckOutBook(CheckOutBook checkOutBook);
CheckOutBook getCheckOutBookById(int id);
void deleteCheckOutBook(int id);
}
