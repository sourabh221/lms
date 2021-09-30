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

export const librarianListReducer = (state = {}, action) => {
  switch (action.type) {
    case LIBRARIAN_LIST_REQUEST:
      return { loading: true }
    case LIBRARIAN_LIST_SUCCESS:
      return { loading: false, response: action.payload }
    case LIBRARIAN_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const librarianActivationReducer = (state = {}, action) => {
  switch (action.type) {
    case LIBRARIAN_ACTIVATION_REQUEST:
      return { loading: true }
    case LIBRARIAN_ACTIVATION_SUCCESS:
      return { loading: false, response: action.payload }
    case LIBRARIAN_ACTIVATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const librarianImageRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case LIBRARIAN_IMAGE_REQUEST:
      return { loading: true }
    case LIBRARIAN_IMAGE_SUCCESS:
      return { loading: false, response: action.payload }
    case LIBRARIAN_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
