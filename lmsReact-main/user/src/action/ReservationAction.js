import axios from 'axios'
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

export const addReservationFunc = (serialNo, period) => {
  return (dispatch) => {
    dispatch({
      type: USER_RESERVATION_ADD_REQUEST,
    })
    const body = {
      bookId: serialNo,
      libraryId: sessionStorage.getItem('libraryId'),
      userId: sessionStorage.getItem('id'),
      period,
    }

    const url = 'http://localhost:4040/backend/user/reserveBook/add-reservation'
    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: USER_RESERVATION_ADD_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_RESERVATION_ADD_FAIL,
          payload: error,
        })
      })
  }
}

export const fetchUserReservationsFunc = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_USER_RESERVATIONS_REQUEST,
    })
    const body = {
      userId: sessionStorage.getItem('id'),
    }

    const url =
      'http://localhost:4040/backend/user/reserveBook/get-reservations-of-user'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: FETCH_USER_RESERVATIONS_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: FETCH_USER_RESERVATIONS_FAIL,
          payload: error,
        })
      })
  }
}

export const deleteUserReservationFunc = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_USER_RESERVATION_REQUEST,
    })
    const body = {
      id,
    }

    const url =
      'http://localhost:4040/backend/user/reserveBook/delete-reservation'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: DELETE_USER_RESERVATION_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: DELETE_USER_RESERVATION_FAIL,
          payload: error,
        })
      })
  }
}
