import {
  USER_ACTIVATION_FAIL,
  USER_ACTIVATION_REQUEST,
  USER_ACTIVATION_SUCCESS,
  USER_IMAGE_FAIL,
  USER_IMAGE_REQUEST,
  USER_IMAGE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from '../constants/LibrarinUserConstants'

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userActivationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIVATION_REQUEST:
      return { loading: true }
    case USER_ACTIVATION_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_ACTIVATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userImageRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_IMAGE_REQUEST:
      return { loading: true }
    case USER_IMAGE_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
