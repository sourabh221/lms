import {
  LIBRARYS_PROFILE_FAIL,
  LIBRARYS_PROFILE_REQUEST,
  LIBRARYS_PROFILE_SUCCESS,
} from '../constants/LibraryConstants'

export const librarysProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case LIBRARYS_PROFILE_REQUEST:
      return { loading: true }
    case LIBRARYS_PROFILE_SUCCESS:
      return { loading: false, response: action.payload }
    case LIBRARYS_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
