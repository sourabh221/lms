import axios from 'axios'
import {
  BOOK_ADD_FAIL,
  BOOK_ADD_REQUEST,
  BOOK_ADD_SUCCESS,
  BOOK_COVER_UPLOAD_FAIL,
  BOOK_COVER_UPLOAD_REQUEST,
  BOOK_COVER_UPLOAD_SUCCESS,
  GET_BOOKS_BY_LIBRARY_FAIL,
  GET_BOOKS_BY_LIBRARY_REQUEST,
  GET_BOOKS_BY_LIBRARY_SUCCESS,
  GET_BOOKS_BY_TITLE_STRING_FAIL,
  GET_BOOKS_BY_TITLE_STRING_REQUEST,
  GET_BOOKS_BY_TITLE_STRING_SUCCESS,
} from '../constants/BookConstant'

export const addBookFunc = (
  bookTitle,
  iSBN,
  bookAuthor,
  bookDescription,
  bookId
) => {
  return (dispatch) => {
    dispatch({
      type: BOOK_ADD_REQUEST,
    })

    let libraryId = sessionStorage.getItem('libraryId')

    const body = {
      bookTitle,
      iSBN,
      bookAuthor,
      bookDescription,
      libraryId,
      bookId,
    }

    const url = 'http://localhost:4040/backend/librarian/book/add-book'
    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: BOOK_ADD_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: BOOK_ADD_FAIL,
          payload: error,
        })
      })
  }
}

export const bookCoverUploadFunc = (file, serialNo) => {
  return (dispatch) => {
    dispatch({
      type: BOOK_COVER_UPLOAD_REQUEST,
    })

    console.log(typeof file)
    // Create an object of formData
    const formData = new FormData()

    // Update the formData object
    formData.append('file', file, file.name)
    const header = {
      headers: {
        'Content-Type': 'multipart/form-data',
        id: serialNo,
      },
    }

    const url = 'http://localhost:4040/backend/librarian/book/bookcover-upload'

    axios
      .post(url, formData, header)
      .then((response) => {
        dispatch({
          type: BOOK_COVER_UPLOAD_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: BOOK_COVER_UPLOAD_FAIL,
          payload: error,
        })
      })
  }
}

export const getBookByTitleStringFunc = (bookTitle) => {
  return (dispatch) => {
    dispatch({
      type: GET_BOOKS_BY_TITLE_STRING_REQUEST,
    })
    const body = {
      bookTitle,
    }

    const url =
      'http://localhost:4040/backend/librarian/book/get-books-by-titleString'
    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: GET_BOOKS_BY_TITLE_STRING_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_BOOKS_BY_TITLE_STRING_FAIL,
          payload: error,
        })
      })
  }
}

export const getBookByLibraryFunc = () => {
  return (dispatch) => {
    dispatch({
      type: GET_BOOKS_BY_LIBRARY_REQUEST,
    })

    let libraryId = sessionStorage.getItem('libraryId')

    const body = {
      libraryId,
    }

    const url =
      'http://localhost:4040/backend/librarian/book/get-books-by-library'
    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: GET_BOOKS_BY_LIBRARY_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_BOOKS_BY_LIBRARY_FAIL,
          payload: error,
        })
      })
  }
}
