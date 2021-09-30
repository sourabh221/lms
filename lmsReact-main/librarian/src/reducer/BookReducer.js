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

export const BookAddReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_ADD_REQUEST:
      return { loading: true }
    case BOOK_ADD_SUCCESS:
      return { loading: false, response: action.payload }
    case BOOK_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const BookCoverUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_COVER_UPLOAD_REQUEST:
      return { loading: true }
    case BOOK_COVER_UPLOAD_SUCCESS:
      return { loading: false, response: action.payload }
    case BOOK_COVER_UPLOAD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const GetBooksByTitleStringReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BOOKS_BY_TITLE_STRING_REQUEST:
      return { loading: true }
    case GET_BOOKS_BY_TITLE_STRING_SUCCESS:
      return { loading: false, response: action.payload }
    case GET_BOOKS_BY_TITLE_STRING_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const GetBooksByLibraryReducer = (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case GET_BOOKS_BY_LIBRARY_REQUEST:
      return { loading: true }
    case GET_BOOKS_BY_LIBRARY_SUCCESS:
      return { loading: false, response: action.payload }
    case GET_BOOKS_BY_LIBRARY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
