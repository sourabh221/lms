import {
  CHECK_OUT_BOOK_BY_LIBRARIAN_FAIL,
  CHECK_OUT_BOOK_BY_LIBRARIAN_REQUEST,
  CHECK_OUT_BOOK_BY_LIBRARIAN_SUCCESS,
} from '../constants/CheckOutBookConstants'

export const checkOutBookByLibrarianReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_OUT_BOOK_BY_LIBRARIAN_REQUEST:
      return { loading: true }
    case CHECK_OUT_BOOK_BY_LIBRARIAN_SUCCESS:
      return { loading: false, response: action.payload }
    case CHECK_OUT_BOOK_BY_LIBRARIAN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
