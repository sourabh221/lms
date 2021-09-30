import axios from 'axios'
import {
  LIBRARYS_PROFILE_FAIL,
  LIBRARYS_PROFILE_REQUEST,
  LIBRARYS_PROFILE_SUCCESS,
} from '../constants/LibraryConstants'

export const getLibrarys = () => {
  return (dispatch) => {
    dispatch({
      type: LIBRARYS_PROFILE_REQUEST,
    })

    const url = 'http://localhost:4040/backend/librarian/library/get-librarys'
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: LIBRARYS_PROFILE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: LIBRARYS_PROFILE_FAIL,
          payload: error,
        })
      })
  }
}
