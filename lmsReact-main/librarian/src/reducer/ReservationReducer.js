import {
  FETCH_ACTIVE_RESERVATION_BY_LIBRARY_FAIL,
  FETCH_ACTIVE_RESERVATION_BY_LIBRARY_REQUEST,
  FETCH_ACTIVE_RESERVATION_BY_LIBRARY_SUCCESS,
} from '../constants/ReserveBookConstants'

export const fetchActiveReservationByLibraryReducer = (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case FETCH_ACTIVE_RESERVATION_BY_LIBRARY_REQUEST:
      return { loading: true }
    case FETCH_ACTIVE_RESERVATION_BY_LIBRARY_SUCCESS:
      return { loading: false, response: action.payload }
    case FETCH_ACTIVE_RESERVATION_BY_LIBRARY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
