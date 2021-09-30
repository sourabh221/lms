import {
  LIBRARY_EMAIL_OTP_FAIL,
  LIBRARY_EMAIL_OTP_REQUEST,
  LIBRARY_EMAIL_OTP_SUCCESS,
  LIBRARY_PASS_RESET_FAIL,
  LIBRARY_PASS_RESET_REQUEST,
  LIBRARY_PASS_RESET_SUCCESS,
  LIBRARY_PROFILE_FAIL,
  LIBRARY_PROFILE_REQUEST,
  LIBRARY_PROFILE_SUCCESS,
  LIBRARY_PROFILE_UPDATE_FAIL,
  LIBRARY_PROFILE_UPDATE_REQUEST,
  LIBRARY_PROFILE_UPDATE_SUCCESS,
  LIBRARY_SIGNIN_FAIL,
  LIBRARY_SIGNIN_REQUEST,
  LIBRARY_SIGNIN_SUCCESS,
  LIBRARY_SIGNOUT,
  LIBRARY_SIGNUP_FAIL,
  LIBRARY_SIGNUP_REQUEST,
  LIBRARY_SIGNUP_SUCCESS,
} from '../constants/LibraryConstants'

export const librarySigninReducer = (state = {}, action) => {
  switch (action.type) {
    case LIBRARY_SIGNIN_REQUEST:
      return { loading: true }
    case LIBRARY_SIGNIN_SUCCESS:
      return { loading: false, response: action.payload }
    case LIBRARY_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
    case LIBRARY_SIGNOUT:
      return {}
    default:
      return state
  }
}

export const librarySignupReducer = (state = {}, action) => {
  switch (action.type) {
    case LIBRARY_SIGNUP_REQUEST:
      return { loading: true }
    case LIBRARY_SIGNUP_SUCCESS:
      return { loading: false, response: action.payload }
    case LIBRARY_SIGNUP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const libraryProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case LIBRARY_PROFILE_REQUEST:
      return { loading: true }
    case LIBRARY_PROFILE_SUCCESS:
      return { loading: false, response: action.payload }
    case LIBRARY_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const libraryProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case LIBRARY_PROFILE_UPDATE_REQUEST:
      return { loading: true }
    case LIBRARY_PROFILE_UPDATE_SUCCESS:
      return { loading: false, response: action.payload }
    case LIBRARY_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const libraryEmailOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case LIBRARY_EMAIL_OTP_REQUEST:
      return { loading: true }
    case LIBRARY_EMAIL_OTP_SUCCESS:
      return { loading: false, response: action.payload }
    case LIBRARY_EMAIL_OTP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const libraryPassResetReducer = (state = {}, action) => {
  switch (action.type) {
    case LIBRARY_PASS_RESET_REQUEST:
      return { loading: true }
    case LIBRARY_PASS_RESET_SUCCESS:
      return { loading: false, response: action.payload }
    case LIBRARY_PASS_RESET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
