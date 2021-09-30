import {
  USER_EMAIL_OTP_FAIL,
  USER_EMAIL_OTP_REQUEST,
  USER_EMAIL_OTP_SUCCESS,
  USER_PASS_RESET_FAIL,
  USER_PASS_RESET_REQUEST,
  USER_PASS_RESET_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_PIC_FAIL,
  USER_PROFILE_PIC_REQUEST,
  USER_PROFILE_PIC_SUCCESS,
  USER_PROFILE_PIC_UPLOAD_FAIL,
  USER_PROFILE_PIC_UPLOAD_REQUEST,
  USER_PROFILE_PIC_UPLOAD_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/UserConstants'

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true }
    case USER_SIGNUP_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true }
    case USER_SIGNIN_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userProfilePicUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_PIC_UPLOAD_REQUEST:
      return { loading: true }
    case USER_PROFILE_PIC_UPLOAD_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_PROFILE_PIC_UPLOAD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userEmailOtpRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EMAIL_OTP_REQUEST:
      return { loading: true }
    case USER_EMAIL_OTP_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_EMAIL_OTP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userPassResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASS_RESET_REQUEST:
      return { loading: true }
    case USER_PASS_RESET_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_PASS_RESET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userProfileRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true }
    case USER_PROFILE_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userProfilePicRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_PIC_REQUEST:
      return { loading: true }
    case USER_PROFILE_PIC_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_PROFILE_PIC_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true }
    case USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
