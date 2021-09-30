import axios from 'axios'
import {
  FETCH_USER_RESERVATION_HISTORIES_FAIL,
  FETCH_USER_RESERVATION_HISTORIES_REQUEST,
  FETCH_USER_RESERVATION_HISTORIES_SUCCESS,
} from '../constants/ReservationHistoryConstants'

export const fetchUserReservationHistoriesFunc = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_USER_RESERVATION_HISTORIES_REQUEST,
    })
    const body = {
      serialNo: sessionStorage.getItem('id'),
    }

    const url =
      'http://localhost:4040/backend/user/reserveBookHistory/get-reservation-history'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: FETCH_USER_RESERVATION_HISTORIES_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: FETCH_USER_RESERVATION_HISTORIES_FAIL,
          payload: error,
        })
      })
  }
}
