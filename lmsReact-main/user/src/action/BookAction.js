import axios from 'axios'
import {
  GET_BOOKS_BY_LIBRARY_FAIL,
  GET_BOOKS_BY_LIBRARY_REQUEST,
  GET_BOOKS_BY_LIBRARY_SUCCESS,
  GET_BOOKS_BY_TITLE_STRING_FAIL,
  GET_BOOKS_BY_TITLE_STRING_REQUEST,
  GET_BOOKS_BY_TITLE_STRING_SUCCESS,
} from '../constants/BookConstant'

export const getBookByLibraryFunc = () => {
  return (dispatch) => {
    dispatch({
      type: GET_BOOKS_BY_LIBRARY_REQUEST,
    })

    let libraryId = sessionStorage.getItem('libraryId')

    const body = {
      libraryId,
    }

    const url = 'http://localhost:4040/backend/user/book/get-books-by-library'
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

export const getBookByTitleStringFunc = (bookTitle) => {
  return (dispatch) => {
    dispatch({
      type: GET_BOOKS_BY_TITLE_STRING_REQUEST,
    })
    const body = {
      bookTitle,
    }

    const url =
      'http://localhost:4040/backend/user/book/get-books-by-titleString'
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
