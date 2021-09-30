import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../actions/LibraryAction'
import '../css/signin.css'

const SigninScreen = (props) => {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [userInfo, setUserInfo] = useState(false)

  const librarySignin = useSelector((store) => store.librarySignin)

  const { loading, error, response } = librarySignin

  const dispatch = useDispatch()

  const SignIn = () => {
    setUserInfo(true)
    dispatch(signIn(email, pwd))
  }

  const SignUp = () => {
    props.history.push('/signup')
  }

  const goToForgetPwd = () => {
    props.history.push('/forget-password')
  }

  useEffect(() => {
    if (response && response.status === 'success' && userInfo) {
      setUserInfo(false)
      sessionStorage.setItem('email', response.data.email)
      sessionStorage.setItem('id', response.data.serialNo)
      props.history.push('/home')
    } else if (response && response.status === 'error' && userInfo) {
      setUserInfo(false)
      alert(response.data)
    } else if (error && userInfo) {
      setUserInfo(false)
      alert(error)
    }
  }, [loading, response, error])

  return (
    <div className="col-md-4 box1">
      <h3 style={{ textAlign: 'center' }}>Login</h3>
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
      <div className="d-grid gap-2" style={{ marginTop: '20px' }}>
        <button
          onClick={SignIn}
          style={{ marginBottom: '10px' }}
          className="btn btn-success"
          type="button">
          Login
        </button>
        <button onClick={SignUp} className="btn btn-primary" type="button">
          Signup
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={goToForgetPwd}
          type="button"
          className="btn btn-link float-end">
          Forgot Password
        </button>
      </div>
    </div>
  )
}

export default SigninScreen
