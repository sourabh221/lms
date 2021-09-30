import {
  RETURN_BOOK_BY_LIBRARIAN_FAIL,
  RETURN_BOOK_BY_LIBRARIAN_REQUEST,
  RETURN_BOOK_BY_LIBRARIAN_SUCCESS,
  SEND_DUE_NOTIFICATIONS_TO_USER_FAIL,
  SEND_DUE_NOTIFICATIONS_TO_USER_REQUEST,
  SEND_DUE_NOTIFICATIONS_TO_USER_SUCCESS,
} from '../constants/ReturnBookConstants'

export const returnBookByLibrarianReducer = (state = {}, action) => {
  switch (action.type) {
    case RETURN_BOOK_BY_LIBRARIAN_REQUEST:
      return { loading: true }
    case RETURN_BOOK_BY_LIBRARIAN_SUCCESS:
      return { loading: false, response: action.payload }
    case RETURN_BOOK_BY_LIBRARIAN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const sendDueNotificationsToUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_DUE_NOTIFICATIONS_TO_USER_REQUEST:
      return { loading: true }
    case SEND_DUE_NOTIFICATIONS_TO_USER_SUCCESS:
      return { loading: false, response: action.payload }
    case SEND_DUE_NOTIFICATIONS_TO_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
