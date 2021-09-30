import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { profilePicUploadFunc, UpdateProfileFunc } from '../action/UserAction'

import '../css/updateProfile.css'

const UpdateProfileScreen = (props) => {
  const [counter, setCounter] = useState(0)
  const [userInfo, setUserInfo] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const [picInputVisible, setPicInputVisible] = useState(false)
  const [phone, setPhone] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [colonyName, setColonyName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [infoUpdated, setInfoUpdated] = useState(false)
  const [picUpdated, setPicUpdated] = useState(false)
  const location = useLocation()

  const dispatch = useDispatch()

  const userProfileUpdate = useSelector((store) => store.userProfileUpdate)

  const { loading, error, response } = userProfileUpdate

  const userProfilePicUpload = useSelector(
    (store) => store.userProfilePicUpload
  )

  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = userProfilePicUpload

  const OnUpdate = () => {
    let flag = 0

    if (phone === '' && flag === 0) {
      flag = 1
      alert('please enter phone no')
    }

    if (phone.length > 10 || (phone.length < 10 && flag === 0)) {
      flag = 1
      alert('please enter phone no upto 10 digit')
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

    if (flag === 0 && window.confirm('are u sure u want to update!')) {
      if (flag === 0) {
        setInfoUpdated(true)
        let firstName = userInfo.firstName != null ? userInfo.firstName : ' '
        let lastName = userInfo.lastName != null ? userInfo.lastName : ' '
        let email = userInfo.email != null ? userInfo.email : ' '
        dispatch(
          UpdateProfileFunc(
            firstName,
            lastName,
            email,
            phone,
            buildingName,
            colonyName,
            city,
            state,
            pincode
          )
        )
      }
    } else {
      let num = 0
      setCounter(num)
      setDataOnLoad()
    }
  }

  const setDataOnLoad = () => {
    console.log('setting data')
    console.log(location.state.data)
    setProfilePic(location.state.profilePic)
    setUserInfo(location.state.data)
    setPhone(location.state.data.phone)
    setBuildingName(location.state.data.addr.buildingName)
    setColonyName(location.state.data.addr.colonyName)
    setCity(location.state.data.addr.city)
    setState(location.state.data.addr.state)
    setPincode(location.state.data.addr.pincode)
    setPicUpdated(false)
    setInfoUpdated(false)
  }
  const makeInputVisible = () => {
    if (picInputVisible) {
      setPicInputVisible(false)
      setProfilePic(location.state.profilePic)
    } else {
      setPicInputVisible(true)
    }
  }

  const uploadProfilePic = () => {
    if (window.confirm('are u sure u want update profile pic')) {
      setPicUpdated(true)
      let serialNo = sessionStorage.getItem('id')
      dispatch(profilePicUploadFunc(profilePic, serialNo))
    } else {
      setProfilePic(location.state.profilePic)
    }
  }

  useEffect(() => {
    if (counter === 0) {
      console.log(location.state)
      setDataOnLoad()
      setCounter(1)
    }

    if (response && response.status === 'success' && infoUpdated) {
      console.log('counter is ' + counter)
      alert('information updated successfully')
      setUserInfo(response.data)
      setPhone(response.data.phone)
      setBuildingName(response.data.addr.buildingName)
      setColonyName(response.data.addr.colonyName)
      setCity(response.data.addr.city)
      setState(response.data.addr.state)
      setPincode(response.data.addr.pincode)
      setInfoUpdated(false)
    } else if (response && response.status === 'error' && infoUpdated) {
      alert(response.data)
      setInfoUpdated(false)
    } else if (error && infoUpdated) {
      alert(error)
      setInfoUpdated(false)
    }

    if (response1 && response1.status === 'success' && picUpdated) {
      console.log(response1.data)
      alert('pic updated successfully')
      setPicUpdated(false)
    } else if (response1 && response1.status === 'error' && picUpdated) {
      console.log(response1)
      alert(response1.data)
      setPicUpdated(false)
    } else if (error1 && picUpdated) {
      alert(error1)
      setPicUpdated(false)
    }
  }, [
    profilePic,
    counter,
    response,
    loading,
    error,
    response1,
    loading1,
    error1,
  ])

  return (
    <div className={picInputVisible ? 'updateouter1' : 'updateouter'}>
      <div className={picInputVisible ? 'updatebox1' : 'updatebox'}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Edit Profile
        </h3>

        <span style={{ marginLeft: '280px' }}>
          {profilePic && (
            <img
              className="updateImage"
              width="100px"
              height="100px"
              src={URL.createObjectURL(profilePic)}
            />
          )}
          <button
            onClick={makeInputVisible}
            title="change profile pic"
            className="btn btn-outline-dark updateImageChangeBtn">
            <i className="fas fa-camera"></i>
          </button>
        </span>
        {picInputVisible && (
          <div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="Image">
                Profile pic
              </label>
              <input
                onChange={(e) => {
                  setProfilePic(e.target.files[0])
                }}
                type="file"
                id="Image"
                className="form-control"
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={uploadProfilePic}
                style={{ marginBottom: '10px' }}
                className="btn btn-outline-secondary"
                type="button">
                update pic
              </button>
            </div>
          </div>
        )}

        {userInfo && (
          <div style={{ marginTop: '20px' }}>
            {userInfo.firstName != null && userInfo.lastName != null && (
              <div>
                <span style={{ fontWeight: 'bold', fontsize: '20px' }}>
                  {' '}
                  name
                </span>{' '}
                : {userInfo.firstName} {userInfo.lastName}
              </div>
            )}

            {userInfo.email && (
              <div>
                {' '}
                <span style={{ fontWeight: 'bold', fontsize: '20px' }}>
                  {' '}
                  email
                </span>{' '}
                : {userInfo.email}
              </div>
            )}

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
                defaultValue={phone != null ? phone : ' '}
                required
              />
            </div>
            <div style={{ marginTop: '10px' }} className="form-group">
              <label
                style={{ marginLeft: '10px', marginBottom: '5px' }}
                className="label1"
                htmlFor="buildingName">
                Shop / Building Name
              </label>
              <input
                onChange={(e) => {
                  setBuildingName(e.target.value)
                }}
                type="text"
                id="buildingName"
                className="form-control"
                placeholder="enter the shop / building name"
                defaultValue={buildingName != null ? buildingName : ' '}
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
                defaultValue={colonyName != null ? colonyName : ''}
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
                defaultValue={city != null ? city : ''}
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
                defaultValue={state != null ? state : ''}
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
                defaultValue={pincode != null ? pincode : ''}
                required
              />
            </div>
            <div className="d-grid gap-2" style={{ marginTop: '20px' }}>
              <button
                onClick={OnUpdate}
                style={{ marginBottom: '10px' }}
                className="btn btn-outline-info"
                type="button">
                update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpdateProfileScreen
