import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { requestOtpFunc, resetPassFunc } from '../action/UserAction'
import '../css/forgetPassword.css'

const ForgetPasswordScreen = (props) => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(null)
  const [userOtp, setUserOtp] = useState(0)
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')

  const [emailVisible, setEmailVisible] = useState(true)
  const [otpVisible, setOtpVisible] = useState(false)
  const [passVisible, setPassVisible] = useState(false)

  const [otpReceived, setOtpReceived] = useState(false)
  const [passSet, setPassSet] = useState(false)

  const userEmailOtpRequest = useSelector((store) => store.userEmailOtpRequest)
  const { response, loading, error } = userEmailOtpRequest

  const userPassReset = useSelector((store) => store.userPassReset)
  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = userPassReset

  const dispatch = useDispatch()
  const history = useHistory()

  const RequestOtpFunc = () => {
    let flag = 0
    if (email === '') {
      flag = 1
      alert('please enter email')
    }
    if (flag === 0) {
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
    if (otp == userOtp) {
      setPassVisible(true)
      setOtpVisible(false)
      alert('please enter the password')
    } else {
      alert('wrong otp please reenter')
    }
  }

  const passwordConfirmFunc = () => {
    let flag = 0
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

    if (flag === 0) {
      setPassSet(true)
      dispatch(resetPassFunc(email, pwd))
    }
  }

  const ClearAll = () => {
    setEmail('')
    setOtp(null)
    setUserOtp(0)
    setPwd('')
    setConfirmPwd('')
    setEmailVisible(true)
    setPassVisible(false)
    setOtpVisible(false)
    setOtpReceived(false)
    setPassSet(false)
  }

  useEffect(() => {
    if (response && response.status === 'success' && otpReceived) {
      console.log(response.data)
      setOtpReceived(false)
      setOtp(response.data)
      setEmailVisible(false)
      setOtpVisible(true)
    } else if (response && response.status === 'error' && otpReceived) {
      alert(response.data)
      setOtpReceived(false)
    } else if (error && otpReceived) {
      alert(error)
      setOtpReceived(false)
    }

    if (response1 && response1.status === 'success' && passSet) {
      console.log(response1.data)
      setPassSet(false)
      alert('password set successfully now please login')
      history.push('/signin')
    } else if (response1 && response1.status === 'error' && passSet) {
      console.log(response1)
      setPassSet(false)
      alert(response1.data)
    } else if (error1 && passSet) {
      alert(error1)
      setPassSet(false)
    }
  }, [response, loading, error, response1, loading1, error1])

  return (
    <div className={passVisible ? 'boxForget2' : 'boxForget1'}>
      <h3 style={{ textAlign: 'center' }}>Reset password</h3>
      {emailVisible && (
        <div>
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
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={RequestOtpFunc}
              style={{ marginLeft: '10px' }}
              className="btn btn-outline-dark"
              type="button">
              request otp
            </button>
          </div>
        </div>
      )}
      {otpVisible && (
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
      )}
      {passVisible && (
        <div>
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
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={passwordConfirmFunc}
              style={{ marginLeft: '10px' }}
              className="btn btn-outline-success"
              type="button">
              confirm
            </button>
            <button
              onClick={ClearAll}
              style={{ marginLeft: '10px' }}
              className="btn btn-outline-info float-end"
              type="button">
              clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgetPasswordScreen
