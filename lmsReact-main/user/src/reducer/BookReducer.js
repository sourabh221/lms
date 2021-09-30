import {
  GET_BOOKS_BY_LIBRARY_FAIL,
  GET_BOOKS_BY_LIBRARY_REQUEST,
  GET_BOOKS_BY_LIBRARY_SUCCESS,
  GET_BOOKS_BY_TITLE_STRING_FAIL,
  GET_BOOKS_BY_TITLE_STRING_REQUEST,
  GET_BOOKS_BY_TITLE_STRING_SUCCESS,
} from '../constants/BookConstant'

export const GetBooksByLibraryReducer = (state = {}, action) => {
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
