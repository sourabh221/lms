import axios from 'axios'
import {
  DELETE_USER_CHECKOUTBOOK_FAIL,
  DELETE_USER_CHECKOUTBOOK_REQUEST,
  DELETE_USER_CHECKOUTBOOK_SUCCESS,
  ISSUE_USER_CHECKOUTBOOK_FAIL,
  ISSUE_USER_CHECKOUTBOOK_REQUEST,
  ISSUE_USER_CHECKOUTBOOK_SUCCESS,
} from '../constants/CheckOutBookConstants'

export const deleteUserCheckOutBookFunc = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_USER_CHECKOUTBOOK_REQUEST,
    })
    const body = {
      id,
    }

    const url =
      'http://localhost:4040/backend/user/checkOutBook/delete-check-out-book'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: DELETE_USER_CHECKOUTBOOK_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: DELETE_USER_CHECKOUTBOOK_FAIL,
          payload: error,
        })
      })
  }
}

export const issueUserCheckOutBookFunc = (id) => {
  return (dispatch) => {
    dispatch({
      type: ISSUE_USER_CHECKOUTBOOK_REQUEST,
    })
    const body = {
      id,
    }

    const url =
      'http://localhost:4040/backend/user/checkOutBook/check-out-by-user'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: ISSUE_USER_CHECKOUTBOOK_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: ISSUE_USER_CHECKOUTBOOK_FAIL,
          payload: error,
        })
      })
  }
}
