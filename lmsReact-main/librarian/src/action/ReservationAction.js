import axios from 'axios'
import {
  FETCH_ACTIVE_RESERVATION_BY_LIBRARY_FAIL,
  FETCH_ACTIVE_RESERVATION_BY_LIBRARY_REQUEST,
  FETCH_ACTIVE_RESERVATION_BY_LIBRARY_SUCCESS,
} from '../constants/ReserveBookConstants'

export const fetchLibraryReservationsFunc = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_ACTIVE_RESERVATION_BY_LIBRARY_REQUEST,
    })
    const body = {
      libraryId: sessionStorage.getItem('libraryId'),
    }

    const url =
      'http://localhost:4040/backend/librarian/reserveBook/get-reservations-of-library'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: FETCH_ACTIVE_RESERVATION_BY_LIBRARY_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ACTIVE_RESERVATION_BY_LIBRARY_FAIL,
          payload: error,
        })
      })
  }
}
