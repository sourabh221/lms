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
  userActivationReducer,
  userImageRequestReducer,
  userListReducer,
} from './reducer/LibrarianUserReducer'
import { fetchActiveReservationByLibraryReducer } from './reducer/ReservationReducer'
import { fetchReservationHistoryByLibraryReducer } from './reducer/ReservationHistoryReducer'
import { checkOutBookByLibrarianReducer } from './reducer/ChectOutBookReducer'
import {
  returnBookByLibrarianReducer,
  sendDueNotificationsToUserReducer,
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
  bookAdd: BookAddReducer,
  bookCoverUpload: BookCoverUploadReducer,
  getBooksByTitleString: GetBooksByTitleStringReducer,
  getBooksByLibrary: GetBooksByLibraryReducer,
  userList: userListReducer,
  userActivation: userActivationReducer,
  userImageRequest: userImageRequestReducer,
  fetchActiveReservationByLibrary: fetchActiveReservationByLibraryReducer,
  fetchReservationHistoryByLibrary: fetchReservationHistoryByLibraryReducer,
  checkOutBookByLibrarian: checkOutBookByLibrarianReducer,
  returnBookByLibrarian: returnBookByLibrarianReducer,
  sendDueNotificationsToUser: sendDueNotificationsToUserReducer,
})

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store
