import { applyMiddleware, createStore } from 'redux'
import { combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {
  librarianActivationReducer,
  librarianImageRequestReducer,
  librarianListReducer,
} from './reducers/LibrarianReducer'
import {
  libraryEmailOtpReducer,
  libraryPassResetReducer,
  libraryProfileReducer,
  libraryProfileUpdateReducer,
  librarySigninReducer,
  librarySignupReducer,
} from './reducers/LibraryReducer'

const reducers = combineReducers({
  librarySignin: librarySigninReducer,
  librarySignup: librarySignupReducer,
  libraryProfile: libraryProfileReducer,
  libraryEmailOtp: libraryEmailOtpReducer,
  libraryPassReset: libraryPassResetReducer,
  libraryProfileUpdate: libraryProfileUpdateReducer,
  librarianList: librarianListReducer,
  librarianActivation: librarianActivationReducer,
  librarianImageRequest: librarianImageRequestReducer,
})

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store
