import {
  DELETE_USER_RESERVATION_FAIL,
  DELETE_USER_RESERVATION_REQUEST,
  DELETE_USER_RESERVATION_SUCCESS,
  FETCH_USER_RESERVATIONS_FAIL,
  FETCH_USER_RESERVATIONS_REQUEST,
  FETCH_USER_RESERVATIONS_SUCCESS,
  USER_RESERVATION_ADD_FAIL,
  USER_RESERVATION_ADD_REQUEST,
  USER_RESERVATION_ADD_SUCCESS,
} from '../constants/ReservationConstants'

export const userReservationAddReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESERVATION_ADD_REQUEST:
      return { loading: true }
    case USER_RESERVATION_ADD_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_RESERVATION_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const fetchUserReservationsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_RESERVATIONS_REQUEST:
      return { loading: true }
    case FETCH_USER_RESERVATIONS_SUCCESS:
      return { loading: false, response: action.payload }
    case FETCH_USER_RESERVATIONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteUserReservationReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_RESERVATION_REQUEST:
      return { loading: true }
    case DELETE_USER_RESERVATION_SUCCESS:
      return { loading: false, response: action.payload }
    case DELETE_USER_RESERVATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
