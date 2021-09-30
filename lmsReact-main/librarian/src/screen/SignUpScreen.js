import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  profilePicUploadFunc,
  requestOtpFunc,
  signUp,
} from '../action/UserAction'
import { getLibrarys } from '../action/LibraryActions'
import LibraryList from '../components/signup/LibraryList'
import SignUpInputs from '../components/signup/SignUpInputs'
import '../css/signup.css'

const SignUpScreen = (props) => {
  const [counter, setCounter] = useState(0)
  const [librarys, setLibrarys] = useState([])
  const [searchWord, setsearchWord] = useState('')
  const [searchResult, setsearchResult] = useState(null)
  const [variable, setVarible] = useState([])
  const [librarySelected, setlibrarySelected] = useState({})
  const [showInputs, setShowInputs] = useState(false)
  const [profilePic, setProfilePic] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [colonyName, setColonyName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')

  const [librarysFetched, setLibrarysFetched] = useState(false)

  const [otp, setOtp] = useState(null)
  const [userOtp, setUserOtp] = useState(0)

  const [otpRequested, setOtpRequested] = useState(false)
  const [otpReceived, setOtpReceived] = useState(false)
  const [userInfo, setUserInfo] = useState(false)
  const [profilePicInfo, setProfilePicInfo] = useState(false)

  const librarysProfile = useSelector((store) => store.librarysProfile)
  const { response, loading, error } = librarysProfile

  const userSignUp = useSelector((store) => store.userSignUp)
  const { loading: loading1, error: error1, response: response1 } = userSignUp

  const userProfilePicUpload = useSelector(
    (store) => store.userProfilePicUpload
  )
  const {
    loading: loading2,
    error: error2,
    response: response2,
  } = userProfilePicUpload

  const userEmailOtpRequest = useSelector((store) => store.userEmailOtpRequest)
  const {
    loading: loading3,
    error: error3,
    response: response3,
  } = userEmailOtpRequest

  const dispatch = useDispatch()
  const history = useHistory()

  const getLibrarysNames = () => {
    setLibrarysFetched(true)
    dispatch(getLibrarys())
  }

  const ModifySearchResult = (value) => {
    console.log('value is ' + value)
    if (value == null) {
      setsearchResult(null)
    } else {
      console.log('search result before ')
      console.log(searchResult)
      setsearchResult(
        librarys.filter((library) => library.libraryName.includes(value))
      )

      console.log('search result after ')
      console.log(searchResult)
    }
    console.log(searchResult)
  }

  const setLibraryData = (data) => {
    let count = 0
    setLibrarys(
      data.map((library) => {
        count++
        return {
          id: count,
          libraryName: library.libraryName,
          serialNo: library.serialNo,
        }
      })
    )
  }

  const onClickRadio = (value) => {
    setVarible(
      librarys.filter((library) => {
        if (library.id == value) {
          return true
        }
        return library.id == value
      })
    )
  }
  const onRegister = (
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
    profilePic
  ) => {
    console.log('in register function ' + email)
    console.log(librarySelected.serialNo)
    setProfilePic(profilePic)
    setFirstName(firstName)
    setLastName(lastName)
    setEmail(email)
    setPhone(phone)
    setPwd(pwd)
    setBirthDate(birthDate)
    setBuildingName(buildingName)
    setColonyName(colonyName)
    setCity(city)
    setState(state)
    setPincode(pincode)

    setOtpRequested(true)
    setOtpReceived(true)
    dispatch(requestOtpFunc(email))
  }

  const onSelectPressed = () => {
    console.log('on selectedpressed')
    console.log(variable[0].libraryName)
    let lib = variable[0]
    console.log(lib)
    let name = lib.libraryName
    console.log('name is ' + name)
    setlibrarySelected(lib)
    setsearchWord(name)
    console.log(searchWord)
    setShowInputs(true)
  }

  const AgainReqeustOtp = () => {
    if (email.length !== 0) {
      setOtpReceived(true)
      dispatch(requestOtpFunc(email))
    }
  }

  const ValidateOtpFunc = () => {
    console.log('received otp is ' + otp)
    console.log('user enter otp is ' + userOtp)
    if (otp == userOtp) {
      setUserInfo(true)
      dispatch(
        signUp(
          librarySelected.serialNo,
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
        )
      )
    } else {
      alert('wrong otp please reenter')
    }
  }

  const uploadProfilePic = (serialNo) => {
    setProfilePicInfo(true)
    dispatch(profilePicUploadFunc(profilePic, serialNo))
  }

  useEffect(() => {
    if (window.location.pathname === '/signup' && counter === 0) {
      setCounter(1)
      getLibrarysNames()
    }

    if (response && response.status === 'success' && librarysFetched) {
      setLibrarysFetched(false)
      setLibraryData(response.data)
    } else if (response && response.status === 'error' && librarysFetched) {
      setLibrarysFetched(false)
      alert(response.data)
    } else if (error && librarysFetched) {
      setLibrarysFetched(false)
      alert(error)
    }

    if (response1 && response1.status === 'success' && userInfo) {
      console.log(response1.data)
      setUserInfo(false)
      uploadProfilePic(response1.data.serialNo)
    } else if (response1 && response1.status === 'error' && userInfo) {
      console.log(response1)
      setUserInfo(false)
      alert(response1.data)
    } else if (error1 && userInfo) {
      setUserInfo(false)
      alert(error1)
    }

    if (response2 && response2.status === 'success' && profilePicInfo) {
      console.log(response2.data)
      setProfilePicInfo(false)
      alert('registeration successfully done now please sign in')
      props.history.push('/signin')
    } else if (response2 && response2.status === 'error' && profilePicInfo) {
      setProfilePicInfo(false)
      console.log(response2)
      alert(response2.data)
    } else if (error2 && profilePicInfo) {
      setProfilePicInfo(false)
      alert(error2)
    }

    if (response3 && response3.status === 'success' && otpReceived) {
      console.log(response3.data)
      setOtpReceived(false)
      setOtp(response3.data)
    } else if (response3 && response3.status === 'error' && otpReceived) {
      alert(response3.data)
      setOtpReceived(false)
      setOtpRequested(false)
    } else if (error3 && otpReceived) {
      alert(error3)
      setOtpReceived(false)
      setOtpRequested(false)
    }
  }, [
    window.location.pathname,
    response,
    loading,
    error,
    response1,
    loading1,
    error1,
    response2,
    loading2,
    error2,
    response3,
    loading3,
    error3,
  ])
  return (
    <div>
      {otpRequested ? (
        <div className="boxSignUpOtp1">
          <div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="otp">
                otp
              </label>
              <input
                onChange={(e) => {
                  setUserOtp(e.target.value)
                }}
                type="number"
                id="otp"
                className="form-control"
                placeholder="enter the otp received by mail"
                required
              />
            </div>
            {otpReceived === false && (
              <div
                style={{ marginLeft: '10px', fontSize: '12px' }}
                className="text-danger">
                otp sent by mail
              </div>
            )}
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={ValidateOtpFunc}
                style={{ marginLeft: '10px' }}
                className="btn btn-outline-dark"
                type="button">
                enter otp
              </button>
              <button
                onClick={AgainReqeustOtp}
                style={{ marginLeft: '10px' }}
                className="btn btn-outline-info float-end"
                type="button">
                request otp
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            showInputs ? 'outer' : searchResult != null ? 'outer2' : 'outer1'
          }>
          <div
            className={
              showInputs ? 'box' : searchResult != null ? 'box2' : 'box1'
            }>
            <h3 style={{ textAlign: 'center' }}>SignUp</h3>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="libraryName">
                Library Name
              </label>
              <input
                onChange={(e) => {
                  if (showInputs) {
                    setShowInputs(false)
                  }
                  if (e.target.value.length === 0) {
                    setsearchWord(null)
                    ModifySearchResult(null)
                  } else {
                    setsearchWord(e.target.value)
                    ModifySearchResult(e.target.value)
                  }
                }}
                value={searchWord == null ? '' : searchWord}
                type="text"
                id="libraryName"
                className="form-control"
                placeholder="enter the library name"
                required
              />
            </div>
            <div style={{ marginTop: '15px' }}>
              {searchResult !== null && (
                <LibraryList
                  list={searchResult}
                  onClickRadio={onClickRadio}
                  onSelectPressed={onSelectPressed}
                />
              )}
              {searchResult === null && (
                <div className="text-danger">
                  Please enter the library name or press select if already
                  selected
                </div>
              )}
            </div>
            <div>
              {showInputs == true && <SignUpInputs signUp={onRegister} />}
              {showInputs == false && (
                <div>
                  <div style={{ marginTop: '10px' }} className="text-center">
                    Already have an account?{'     '}
                    <Link to="/signin">Sign in</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUpScreen
