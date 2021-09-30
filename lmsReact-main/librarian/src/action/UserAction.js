import axios from 'axios'
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
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/UserConstants'

export const signUp = (
  serialNo,
  firstName,
  lastName,
  email,
  phone,
  pwd,
  birthDate,
  buildingName,
  colonyName,
  city,
  state,
  pincode
) => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    })

    const header = {
      headers: {
        id: serialNo,
      },
    }

    const body = {
      firstName,
      lastName,
      email,
      phone,
      pwd,
      birthDate,
      buildingName,
      colonyName,
      city,
      state,
      pincode,
    }

    const url = 'http://localhost:4040/backend/librarian/signup'
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNUP_FAIL,
          payload: error,
        })
      })
  }
}

export const signIn = (email, pwd) => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    })

    const body = {
      email,
      pwd,
    }

    const url = 'http://localhost:4040/backend/librarian/login'

    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: USER_SIGNIN_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: error,
        })
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('id')
    dispatch({ type: USER_SIGNOUT })
    document.location.href = '/signin'
  }
}

export const requestOtpFunc = (email) => {
  return (dispatch) => {
    dispatch({
      type: USER_EMAIL_OTP_REQUEST,
    })

    const body = {
      email,
    }

    const url = 'http://localhost:4040/backend/librarian/send-otp'

    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: USER_EMAIL_OTP_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_EMAIL_OTP_FAIL,
          payload: error,
        })
      })
  }
}

export const resetPassFunc = (email, pwd) => {
  return (dispatch) => {
    dispatch({
      type: USER_PASS_RESET_REQUEST,
    })

    const body = {
      email,
      pwd,
    }

    const url = 'http://localhost:4040/backend/librarian/update-password'

    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: USER_PASS_RESET_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_PASS_RESET_FAIL,
          payload: error,
        })
      })
  }
}

export const profilePicUploadFunc = (file, serialNo) => {
  return (dispatch) => {
    dispatch({
      type: USER_PROFILE_PIC_UPLOAD_REQUEST,
    })

    console.log(typeof file)
    // Create an object of formData
    const formData = new FormData()

    // Update the formData object
    formData.append('file', file, file.name)
    const header = {
      headers: {
        'Content-Type': 'multipart/form-data',
        id: serialNo,
      },
    }

    const url = 'http://localhost:4040/backend/librarian/image-upload'

    axios
      .post(url, formData, header)
      .then((response) => {
        dispatch({
          type: USER_PROFILE_PIC_UPLOAD_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_PROFILE_PIC_UPLOAD_FAIL,
          payload: error,
        })
      })
  }
}

export const getProfileFunc = () => {
  return (dispatch) => {
    dispatch({
      type: USER_PROFILE_REQUEST,
    })

    const serialNo = sessionStorage.getItem('id')
    const body = {
      serialNo,
    }

    const url = 'http://localhost:4040/backend/librarian/get-profile'

    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: USER_PROFILE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_PROFILE_FAIL,
          payload: error,
        })
      })
  }
}

export const getProfilePicFunc = () => {
  return (dispatch) => {
    dispatch({
      type: USER_PROFILE_PIC_REQUEST,
    })

    const body = {
      serialNo: sessionStorage.getItem('id'),
    }

    const url = 'http://localhost:4040/backend/librarian/image-download'

    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: USER_PROFILE_PIC_SUCCESS,
          payload: response,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_PROFILE_PIC_FAIL,
          payload: error,
        })
      })
  }
}

export const UpdateProfileFunc = (
  firstName,
  lastName,
  email,
  phone,
  buildingName,
  colonyName,
  city,
  state,
  pincode
) => {
  return (dispatch) => {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
    })

    let serialNo = sessionStorage.getItem('id')

    /*const header = {
      headers: {
        id: serialNo,
      },
    }*/
    const body = {
      firstName,
      lastName,
      email,
      phone,
      buildingName,
      colonyName,
      city,
      state,
      pincode,
    }

    const url = 'http://localhost:4040/backend/librarian/update-profile'
    axios
      .put(url, body)
      .then((response) => {
        dispatch({
          type: USER_PROFILE_UPDATE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_PROFILE_UPDATE_FAIL,
          payload: error,
        })
      })
  }
}
