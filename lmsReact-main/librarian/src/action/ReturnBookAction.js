import axios from 'axios'
import {
  RETURN_BOOK_BY_LIBRARIAN_FAIL,
  RETURN_BOOK_BY_LIBRARIAN_REQUEST,
  RETURN_BOOK_BY_LIBRARIAN_SUCCESS,
  SEND_DUE_NOTIFICATIONS_TO_USER_FAIL,
  SEND_DUE_NOTIFICATIONS_TO_USER_REQUEST,
  SEND_DUE_NOTIFICATIONS_TO_USER_SUCCESS,
} from '../constants/ReturnBookConstants'

export const returnBookByLibrarianFunc = (id) => {
  return (dispatch) => {
    dispatch({
      type: RETURN_BOOK_BY_LIBRARIAN_REQUEST,
    })
    const body = {
      id,
      userId: sessionStorage.getItem('id'),
    }

    const url =
      'http://localhost:4040/backend/librarian/returnBook/return-book-by-librarian'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: RETURN_BOOK_BY_LIBRARIAN_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: RETURN_BOOK_BY_LIBRARIAN_FAIL,
          payload: error,
        })
      })
  }
}

export const sendDueNotificationsToUserFunc = (id) => {
  return (dispatch) => {
    dispatch({
      type: SEND_DUE_NOTIFICATIONS_TO_USER_REQUEST,
    })
    const body = {
      libraryId: sessionStorage.getItem('libraryId'),
    }

    const url =
      'http://localhost:4040/backend/librarian/returnBook/send-notifications-to-user'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: SEND_DUE_NOTIFICATIONS_TO_USER_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: SEND_DUE_NOTIFICATIONS_TO_USER_FAIL,
          payload: error,
        })
      })
  }
}
