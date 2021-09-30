import { applyMiddleware, createStore } from 'redux'
import { combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {
  userEmailOtpRequestReducer,
  userPassResetReducer,
  userProfilePicRequestReducer,
  userProfilePicUploadReducer,
  userProfileRequestReducer,
  userProfileUpdateReducer,
  userSignInReducer,
  userSignupReducer,
} from './reducer/UserReducer'

import { librarysProfileReducer } from './reducer/LibraryReducer'
import {
  BookAddReducer,
  BookCoverUploadReducer,
  GetBooksByLibraryReducer,
  GetBooksByTitleStringReducer,
} from './reducer/BookReducer'
import {
  deleteUserReservationReducer,
  fetchUserReservationsReducer,
  userReservationAddReducer,
} from './reducer/ReservationReducer'

import { fetchUserReservationHistoriesReducer } from './reducer/ReservationHistoryReducer'
import {
  deleteUserCheckOutBookReducer,
  issueUserCheckOutBookReducer,
} from './reducer/CheckOutBookReducer'
import {
  calculateFineOfUserReducer,
  issueUserReturnBookReducer,
  payFineOfUserReducer,
} from './reducer/ReturnBookReducer'

const reducers = combineReducers({
  userSignUp: userSignupReducer,
  librarysProfile: librarysProfileReducer,
  userSignin: userSignInReducer,
  userEmailOtpRequest: userEmailOtpRequestReducer,
  userPassReset: userPassResetReducer,
  userProfilePicUpload: userProfilePicUploadReducer,
  userProfileRequest: userProfileRequestReducer,
  userProfilePicRequest: userProfilePicRequestReducer,
  userProfileUpdate: userProfileUpdateReducer,
  getBooksByLibrary: GetBooksByLibraryReducer,
  getBooksByTitleString: GetBooksByTitleStringReducer,
  userReservationAdd: userReservationAddReducer,
  fetchUserReservations: fetchUserReservationsReducer,
  deleteUserReservation: deleteUserReservationReducer,
  fetchUserReservationHistories: fetchUserReservationHistoriesReducer,
  issueUserCheckOutBook: issueUserCheckOutBookReducer,
  deleteUserCheckOutBook: deleteUserCheckOutBookReducer,
  issueUserReturnBook: issueUserReturnBookReducer,
  calculateFineOfUser: calculateFineOfUserReducer,
  payFineOfUser: payFineOfUserReducer,
})

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store
