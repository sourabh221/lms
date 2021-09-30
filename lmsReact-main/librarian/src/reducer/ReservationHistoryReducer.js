import {
  FETCH_RESERVATION_HISTORY_BY_LIBRARY_FAIL,
  FETCH_RESERVATION_HISTORY_BY_LIBRARY_REQUEST,
  FETCH_RESERVATION_HISTORY_BY_LIBRARY_SUCCESS,
} from '../constants/ReserveBookHistoryConstants'

export const fetchReservationHistoryByLibraryReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_RESERVATION_HISTORY_BY_LIBRARY_REQUEST:
      return { loading: true }
    case FETCH_RESERVATION_HISTORY_BY_LIBRARY_SUCCESS:
      return { loading: false, response: action.payload }
    case FETCH_RESERVATION_HISTORY_BY_LIBRARY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
