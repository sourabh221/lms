import axios from 'axios'
import {
  CHECK_OUT_BOOK_BY_LIBRARIAN_FAIL,
  CHECK_OUT_BOOK_BY_LIBRARIAN_REQUEST,
  CHECK_OUT_BOOK_BY_LIBRARIAN_SUCCESS,
} from '../constants/CheckOutBookConstants'

export const issueLibrarianCheckOutBookFunc = (id) => {
  return (dispatch) => {
    dispatch({
      type: CHECK_OUT_BOOK_BY_LIBRARIAN_REQUEST,
    })
    const body = {
      id,
    }

    const url =
      'http://localhost:4040/backend/librarian/checkOutBook/check-out-by-librarian'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: CHECK_OUT_BOOK_BY_LIBRARIAN_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CHECK_OUT_BOOK_BY_LIBRARIAN_FAIL,
          payload: error,
        })
      })
  }
}
