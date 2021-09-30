import axios from 'axios'
import {
  FETCH_RESERVATION_HISTORY_BY_LIBRARY_FAIL,
  FETCH_RESERVATION_HISTORY_BY_LIBRARY_REQUEST,
  FETCH_RESERVATION_HISTORY_BY_LIBRARY_SUCCESS,
} from '../constants/ReserveBookHistoryConstants'

export const fetchLibrariesReservationHistoriesFunc = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_RESERVATION_HISTORY_BY_LIBRARY_REQUEST,
    })
    const body = {
      libraryId: sessionStorage.getItem('libraryId'),
    }

    const url =
      'http://localhost:4040/backend/librarian/reserveBookHistory/get-reservation-history'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: FETCH_RESERVATION_HISTORY_BY_LIBRARY_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: FETCH_RESERVATION_HISTORY_BY_LIBRARY_FAIL,
          payload: error,
        })
      })
  }
}
