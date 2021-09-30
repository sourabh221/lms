import { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUpInputs = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [colonyName, setColonyName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [profilePic, setProfilePic] = useState(null)

  const OnRegister = () => {
    let flag = 0

    if (firstName === '') {
      flag = 1
      alert('please enter first name')
    }

    if (lastName === '') {
      flag = 1
      alert('please enter last name')
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

    if (phone.length > 10 || phone.length < 10) {
      flag = 1
      alert('please enter phone no upto 10 digit')
    }

    if (birthDate === '' && flag === 0) {
      flag = 1
      alert('please enter the birthdate')
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

    if (profilePic == null && flag === 0) {
      flag = 1
      alert('please upload profile pic')
    }

    if (flag === 0) {
      props.signUp(
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
      )
    }
  }

  return (
    <div>
      <div style={{ marginTop: '10px' }} className="form-group">
        <label
          style={{ marginLeft: '10px', marginBottom: '5px' }}
          className="label1"
          htmlFor="firstName">
          First Name
        </label>
        <input
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
          type="text"
          id="firstName"
          className="form-control"
          placeholder="enter the first name"
          required
        />
      </div>
      <div style={{ marginTop: '10px' }} className="form-group">
        <label
          style={{ marginLeft: '10px', marginBottom: '5px' }}
          className="label1"
          htmlFor="lastName">
          Last Name
        </label>
        <input
          onChange={(e) => {
            setLastName(e.target.value)
          }}
          type="text"
          id="firstName"
          className="form-control"
          placeholder="enter the last name"
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
          htmlFor="birthDate">
          Birth Date
        </label>
        <input
          onChange={(e) => {
            setBirthDate(e.target.value)
          }}
          type="date"
          id="birthDate"
          className="form-control"
          placeholder="enter the birth date"
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
      <div style={{ marginTop: '10px' }} className="form-group">
        <label
          style={{ marginLeft: '10px', marginBottom: '5px' }}
          className="label1"
          htmlFor="Image">
          Profile pic
        </label>
        <input
          onChange={(e) => {
            console.log(typeof e.target.files[0])
            setProfilePic(e.target.files[0])
          }}
          type="file"
          id="Image"
          className="form-control"
        />
      </div>
      {profilePic != null && (
        <img
          style={{ marginTop: '10px' }}
          width="100px"
          height="100px"
          src={URL.createObjectURL(profilePic)}
        />
      )}
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
  )
}

export default SignUpInputs
