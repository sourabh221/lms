import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../action/UserAction'
import '../css/signin.css'

const SigninScreen = (props) => {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [infoSubmitted, setInfoSubmitted] = useState(false)

  const userSignin = useSelector((store) => store.userSignin)

  const { loading, error, response } = userSignin

  const dispatch = useDispatch()

  const SignIn = () => {
    setInfoSubmitted(true)
    dispatch(signIn(email, pwd))
  }

  const SignUp = () => {
    props.history.push('/signup')
  }

  const goToForgetPwd = () => {
    props.history.push('/forget-password')
  }

  useEffect(() => {
    if (response && response.status === 'success' && infoSubmitted) {
      console.log(response.data)
      setInfoSubmitted(false)
      sessionStorage.setItem('email', response.data.email)
      sessionStorage.setItem('id', response.data.serialNo)
      sessionStorage.setItem('libraryId', response.data.library.serialNo)
      props.history.push('/home')
    } else if (response && response.status === 'error' && infoSubmitted) {
      alert(response.data)
      setInfoSubmitted(false)
    } else if (error && infoSubmitted) {
      alert(error)
      setInfoSubmitted(false)
    }
  }, [loading, response, error])

  return (
    <div className="col-md-4 boxSignin1">
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
