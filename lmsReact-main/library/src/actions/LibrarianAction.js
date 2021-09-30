import axios from 'axios'
import {
  LIBRARIAN_ACTIVATION_FAIL,
  LIBRARIAN_ACTIVATION_REQUEST,
  LIBRARIAN_ACTIVATION_SUCCESS,
  LIBRARIAN_IMAGE_FAIL,
  LIBRARIAN_IMAGE_REQUEST,
  LIBRARIAN_IMAGE_SUCCESS,
  LIBRARIAN_LIST_FAIL,
  LIBRARIAN_LIST_REQUEST,
  LIBRARIAN_LIST_SUCCESS,
} from '../constants/LibrarinConstans'

export const GetLibrarians = () => {
  return (dispatch) => {
    dispatch({
      type: LIBRARIAN_LIST_REQUEST,
    })

    const url = 'http://localhost:4040/backend/library/librarian/get-librarians'
    const header = {
      headers: {
        id: sessionStorage.getItem('id'),
      },
    }

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: LIBRARIAN_LIST_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: LIBRARIAN_LIST_FAIL,
          payload: error,
        })
      })
  }
}

export const ActivationLibrarian = (id) => {
  return (dispatch) => {
    dispatch({
      type: LIBRARIAN_ACTIVATION_REQUEST,
    })

    const url =
      'http://localhost:4040/backend/library/librarian/activate-librarian'

    const body = {
      serialNo: id,
    }

    const header = {
      headers: {
        id: sessionStorage.getItem('id'),
      },
    }

    axios
      .put(url, body, header)
      .then((response) => {
        dispatch({
          type: LIBRARIAN_ACTIVATION_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: LIBRARIAN_ACTIVATION_FAIL,
          payload: error,
        })
      })
  }
}

export const LibrarianImageRequester = (id) => {
  return (dispatch) => {
    dispatch({
      type: LIBRARIAN_IMAGE_REQUEST,
    })

    const url = 'http://localhost:4040/backend/library/librarian/image-download'

    const body = {
      serialNo: id,
    }

    const header = {
      headers: {
        id: sessionStorage.getItem('id'),
        responseType: 'blob',
      },
    }

    axios
      .put(url, body, header)
      .then((response) => {
        dispatch({
          type: LIBRARIAN_IMAGE_SUCCESS,
          payload: response,
        })
      })
      .catch((error) => {
        dispatch({
          type: LIBRARIAN_IMAGE_FAIL,
          payload: error,
        })
      })
  }
}
