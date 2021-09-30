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

export const issueUserReturnBookReducer = (state = {}, action) => {
  switch (action.type) {
    case ISSUE_USER_RETURNBOOK_REQUEST:
      return { loading: true }
    case ISSUE_USER_RETURNBOOK_SUCCESS:
      return { loading: false, response: action.payload }
    case ISSUE_USER_RETURNBOOK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const calculateFineOfUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CALCULATE_FINE_OF_USER_REQUEST:
      return { loading: true }
    case CALCULATE_FINE_OF_USER_SUCCESS:
      return { loading: false, response: action.payload }
    case CALCULATE_FINE_OF_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const payFineOfUserReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_FINE_OF_USER_REQUEST:
      return { loading: true }
    case PAY_FINE_OF_USER_SUCCESS:
      return { loading: false, response: action.payload }
    case PAY_FINE_OF_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
