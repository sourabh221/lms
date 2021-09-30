import {
  FETCH_USER_RESERVATION_HISTORIES_FAIL,
  FETCH_USER_RESERVATION_HISTORIES_REQUEST,
  FETCH_USER_RESERVATION_HISTORIES_SUCCESS,
} from '../constants/ReservationHistoryConstants'

export const fetchUserReservationHistoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_RESERVATION_HISTORIES_REQUEST:
      return { loading: true }
    case FETCH_USER_RESERVATION_HISTORIES_SUCCESS:
      return { loading: false, response: action.payload }
    case FETCH_USER_RESERVATION_HISTORIES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
