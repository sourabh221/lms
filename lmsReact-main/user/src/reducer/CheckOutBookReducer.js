import {
  DELETE_USER_CHECKOUTBOOK_FAIL,
  DELETE_USER_CHECKOUTBOOK_REQUEST,
  DELETE_USER_CHECKOUTBOOK_SUCCESS,
  ISSUE_USER_CHECKOUTBOOK_FAIL,
  ISSUE_USER_CHECKOUTBOOK_REQUEST,
  ISSUE_USER_CHECKOUTBOOK_SUCCESS,
} from '../constants/CheckOutBookConstants'

export const deleteUserCheckOutBookReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_CHECKOUTBOOK_REQUEST:
      return { loading: true }
    case DELETE_USER_CHECKOUTBOOK_SUCCESS:
      return { loading: false, response: action.payload }
    case DELETE_USER_CHECKOUTBOOK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const issueUserCheckOutBookReducer = (state = {}, action) => {
  switch (action.type) {
    case ISSUE_USER_CHECKOUTBOOK_REQUEST:
      return { loading: true }
    case ISSUE_USER_CHECKOUTBOOK_SUCCESS:
      return { loading: false, response: action.payload }
    case ISSUE_USER_CHECKOUTBOOK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
