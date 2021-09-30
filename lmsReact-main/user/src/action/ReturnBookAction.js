import axios from 'axios'
import {
  CALCULATE_FINE_OF_USER_FAIL,
  CALCULATE_FINE_OF_USER_REQUEST,
  CALCULATE_FINE_OF_USER_SUCCESS,
  ISSUE_USER_RETURNBOOK_FAIL,
  ISSUE_USER_RETURNBOOK_REQUEST,
  ISSUE_USER_RETURNBOOK_SUCCESS,
  PAY_FINE_OF_USER_FAIL,
  PAY_FINE_OF_USER_REQUEST,
  PAY_FINE_OF_USER_SUCCESS,
} from '../constants/ReturnBookConstants'

export const issueUserReturnBookFunc = (id) => {
  return (dispatch) => {
    dispatch({
      type: ISSUE_USER_RETURNBOOK_REQUEST,
    })
    const body = {
      id,
    }

    const url =
      'http://localhost:4040/backend/user/returnBook/return-book-by-user'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: ISSUE_USER_RETURNBOOK_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: ISSUE_USER_RETURNBOOK_FAIL,
          payload: error,
        })
      })
  }
}

export const calculateFineOfUserFunc = () => {
  return (dispatch) => {
    dispatch({
      type: CALCULATE_FINE_OF_USER_REQUEST,
    })
    const body = {
      userId: sessionStorage.getItem('id'),
    }

    const url =
      'http://localhost:4040/backend/user/returnBook/Calculate-fine-of-User'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: CALCULATE_FINE_OF_USER_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CALCULATE_FINE_OF_USER_FAIL,
          payload: error,
        })
      })
  }
}

export const payFineOfUserFunc = () => {
  return (dispatch) => {
    dispatch({
      type: PAY_FINE_OF_USER_REQUEST,
    })
    const body = {
      userId: sessionStorage.getItem('id'),
    }

    const url = 'http://localhost:4040/backend/user/returnBook/fine-paid'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: PAY_FINE_OF_USER_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: PAY_FINE_OF_USER_FAIL,
          payload: error,
        })
      })
  }
}
