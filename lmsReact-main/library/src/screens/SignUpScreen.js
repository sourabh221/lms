import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestOtpFunc, signUp } from '../actions/LibraryAction'
import '../css/signup.css'
const SignUpScreen = (props) => {
  const [libraryName, setLibraryName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [colonyName, setColonyName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [otp, setOtp] = useState(null)
  const [userOtp, setUserOtp] = useState(0)

  const [otpRequested, setOtpRequested] = useState(false)
  const [otpReceived, setOtpReceived] = useState(false)
  const [userInfo, setUserInfo] = useState(false)
  const [profilePicInfo, setProfilePicInfo] = useState(false)

  const librarySignUp = useSelector((store) => store.librarySignup)

  const { loading, error, response } = librarySignUp

  const libraryEmailOtp = useSelector((store) => store.libraryEmailOtp)
  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = libraryEmailOtp

  const dispatch = useDispatch()

  const OnRegister = () => {
    let flag = 0

    if (libraryName === '') {
      flag = 1
      alert('please enter library name')
    }

    if (email === '' && flag === 0) {
      flag = 1
      alert('please enter email')
    }

    if (pwd === '' && flag === 0) {
      flag = 1
      alert('please enter pwd')
    } else {
      if (confirmPwd === '' && flag === 0) {
        flag = 1
        alert('please enter confirm password')
      } else {
        if (pwd !== confirmPwd) {
          flag = 1
          alert('please reenter the passwords')
        }
      }
    }

    if (phone === '' && flag === 0) {
      flag = 1
      alert('please enter phone no')
    }

    if (buildingName === '' && flag === 0) {
      flag = 1
      alert('please enter building name')
    }

    if (colonyName === '' && flag === 0) {
      flag = 1
      alert('please enter colony name')
    }

    if (city === '' && flag === 0) {
      flag = 1
      alert('please enter city')
    }

    if (state === '' && flag === 0) {
      flag = 1
      alert('please enter state')
    }

    if (pincode === '' && flag === 0) {
      flag = 1
      alert('please enter pincode')
    }

    if (flag === 0) {
      setOtpRequested(true)
      setOtpReceived(true)
      dispatch(requestOtpFunc(email))
    }
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
          libraryName,
          email,
          phone,
          pwd,
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

  useEffect(() => {
    if (response && response.status === 'success' && userInfo) {
      setUserInfo(false)
      setOtpRequested(false)
      alert('account created successfully')
      props.history.push('/signin')
    } else if (response && response.status === 'error' && userInfo) {
      setUserInfo(false)
      setOtpRequested(false)
      alert(response.error)
    } else if (error && userInfo) {
      setUserInfo(false)
      setOtpRequested(false)
      alert(error)
    }

    if (response1 && response1.status === 'success' && otpReceived) {
      console.log(response1.data)
      setOtpReceived(false)
      setOtp(response1.data)
    } else if (response1 && response1.status === 'error' && otpReceived) {
      alert(response1.data)
      setOtpReceived(false)
      setOtpRequested(false)
    } else if (error1 && otpReceived) {
      alert(error1)
      setOtpReceived(false)
      setOtpRequested(false)
    }
  }, [loading, error, response, response1, loading1, error1])

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
        <div className="outer">
          <div className="box">
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
                  setLibraryName(e.target.value)
                }}
                type="text"
                id="libraryName"
                className="form-control"
                placeholder="enter the library name"
                required
              />
            </div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="email">
                email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                type="email"
                id="email"
                className="form-control"
                placeholder="enter the email address"
                required
              />
            </div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="phone">
                phone
              </label>
              <input
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
                type="number"
                id="phone"
                className="form-control"
                placeholder="enter the phone no"
                required
              />
            </div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="password">
                password
              </label>
              <input
                onChange={(e) => {
                  setPwd(e.target.value)
                }}
                type="password"
                id="password"
                className="form-control"
                placeholder="enter the password"
                required
              />
            </div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="confirm-password">
                confirm password
              </label>
              <input
                onChange={(e) => {
                  setConfirmPwd(e.target.value)
                }}
                type="password"
                id="confirm-password"
                className="form-control"
                placeholder="confirm the password"
                required
              />
            </div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="buildingName">
                Building Name
              </label>
              <input
                onChange={(e) => {
                  setBuildingName(e.target.value)
                }}
                type="text"
                id="buildingName"
                className="form-control"
                placeholder="enter the building name"
                required
              />
            </div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="colonyName">
                Colony Name
              </label>
              <input
                onChange={(e) => {
                  setColonyName(e.target.value)
                }}
                type="text"
                id="colonyName"
                className="form-control"
                placeholder="enter the colony name"
                required
              />
            </div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="cityName">
                city
              </label>
              <input
                onChange={(e) => {
                  setCity(e.target.value)
                }}
                type="text"
                id="cityName"
                className="form-control"
                placeholder="enter the city name"
                required
              />
            </div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="stateName">
                state
              </label>
              <input
                onChange={(e) => {
                  setState(e.target.value)
                }}
                type="text"
                id="stateName"
                className="form-control"
                placeholder="enter the state name"
                required
              />
            </div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="pincode">
                Pincode
              </label>
              <input
                onChange={(e) => {
                  setPincode(e.target.value)
                }}
                type="number"
                id="pincode"
                className="form-control"
                placeholder="enter the pincode no"
                required
              />
            </div>
            <div className="d-grid gap-2" style={{ marginTop: '20px' }}>
              <button
                onClick={OnRegister}
                style={{ marginBottom: '10px' }}
                className="btn btn-success"
                type="button">
                Register
              </button>
            </div>
            <div style={{ marginTop: '10px' }} className="text-center">
              Already have an account?{'     '}
              <Link to="/signin">Sign in</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUpScreen
