import axios from 'axios'
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

export const signUp = (
  libraryName,
  email,
  phone,
  pwd,
  buildingName,
  colonyName,
  city,
  state,
  pincode
) => {
  return (dispatch) => {
    dispatch({
      type: LIBRARY_SIGNUP_REQUEST,
    })

    const body = {
      libraryName,
      email,
      phone,
      pwd,
      buildingName,
      colonyName,
      city,
      state,
      pincode,
    }

    const url = 'http://localhost:4040/backend/library/signup'
    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: LIBRARY_SIGNUP_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: LIBRARY_SIGNUP_FAIL,
          payload: error,
        })
      })
  }
}

export const signIn = (email, pwd) => {
  return (dispatch) => {
    dispatch({
      type: LIBRARY_SIGNIN_REQUEST,
    })

    const body = {
      email,
      pwd,
    }

    const url = 'http://localhost:4040/backend/library/login'

    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: LIBRARY_SIGNIN_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: LIBRARY_SIGNIN_FAIL,
          payload: error,
        })
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('id')
    dispatch({ type: LIBRARY_SIGNOUT })
    document.location.href = '/signin'
  }
}

export const getProfile = () => {
  return (dispatch) => {
    dispatch({
      type: LIBRARY_PROFILE_REQUEST,
    })
    const email = sessionStorage.getItem('email')
    const serialNo = sessionStorage.getItem('id')

    const body = {
      email,
      serialNo,
    }

    const url = 'http://localhost:4040/backend/library/get-library'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: LIBRARY_PROFILE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: LIBRARY_PROFILE_FAIL,
          payload: error,
        })
      })
  }
}

export const updateProfile = (
  phone,
  buildingName,
  colonyName,
  city,
  state,
  pincode
) => {
  return (dispatch) => {
    dispatch({
      type: LIBRARY_PROFILE_UPDATE_REQUEST,
    })

    const email = sessionStorage.getItem('email')
    const serialNo = sessionStorage.getItem('id')

    const body = {
      serialNo,
      email,
      phone,
      buildingName,
      colonyName,
      city,
      state,
      pincode,
    }

    const url = 'http://localhost:4040/backend/library/update-profile'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: LIBRARY_PROFILE_UPDATE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: LIBRARY_PROFILE_UPDATE_FAIL,
          payload: error,
        })
      })
  }
}

export const requestOtpFunc = (email) => {
  return (dispatch) => {
    dispatch({
      type: LIBRARY_EMAIL_OTP_REQUEST,
    })

    const body = {
      email,
    }

    const url = 'http://localhost:4040/backend/library/send-otp'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: LIBRARY_EMAIL_OTP_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: LIBRARY_EMAIL_OTP_FAIL,
          payload: error,
        })
      })
  }
}

export const UpdatePassword = (email, pwd) => {
  return (dispatch) => {
    dispatch({
      type: LIBRARY_PASS_RESET_REQUEST,
    })

    const body = {
      email,
      pwd,
    }

    const url = 'http://localhost:4040/backend/library/update-password'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: LIBRARY_PASS_RESET_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: LIBRARY_PASS_RESET_FAIL,
          payload: error,
        })
      })
  }
}
