import axios from 'axios'
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

export const getUsersFunc = () => {
  return (dispatch) => {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const url = 'http://localhost:4040/backend/library/user/get-users'
    const header = {
      headers: {
        id: sessionStorage.getItem('libraryId'),
      },
    }

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: USER_LIST_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_LIST_FAIL,
          payload: error,
        })
      })
  }
}

export const activationUserFunc = (id) => {
  return (dispatch) => {
    dispatch({
      type: USER_ACTIVATION_REQUEST,
    })

    const url = 'http://localhost:4040/backend/library/user/activate-user'

    const body = {
      serialNo: id,
    }

    const header = {
      headers: {
        id: sessionStorage.getItem('libraryId'),
      },
    }

    axios
      .put(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_ACTIVATION_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_ACTIVATION_FAIL,
          payload: error,
        })
      })
  }
}

export const userImageRequesterFunc = (id) => {
  return (dispatch) => {
    dispatch({
      type: USER_IMAGE_REQUEST,
    })

    const url = 'http://localhost:4040/backend/library/user/image-download'

    const body = {
      serialNo: id,
    }

    const header = {
      headers: {
        id: sessionStorage.getItem('libraryId'),
        responseType: 'blob',
      },
    }

    axios
      .put(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_IMAGE_SUCCESS,
          payload: response,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_IMAGE_FAIL,
          payload: error,
        })
      })
  }
}
