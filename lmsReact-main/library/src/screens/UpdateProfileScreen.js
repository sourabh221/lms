import { useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfile, updateProfile } from '../actions/LibraryAction'
import '../css/updateProfile.css'

const UpdateProfileScreen = () => {
  const [libraryName, setLibraryName] = useState('')
  const [phone, setPhone] = useState(0)
  const [counter, setCounter] = useState(0)
  const [buildingName, setBuildingName] = useState('')
  const [colonyName, setColonyName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setpincode] = useState(0)

  const [infoReceived, setInfoReceived] = useState(false)
  const [infoUpdated, setInfoUpdated] = useState(false)

  const history = useHistory()
  const libraryProfile = useSelector((store) => store.libraryProfile)
  const libraryProfileUpdate = useSelector(
    (store) => store.libraryProfileUpdate
  )

  const { loading, error, response } = libraryProfile
  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = libraryProfileUpdate

  const dispatch = useDispatch()

  const getData = () => {
    setInfoReceived(true)
    dispatch(getProfile())
    console.log('in get data')
  }

  const onUpdate = () => {
    let flag = 0
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
      if (window.confirm('Are u sure ? You want to update')) {
        setInfoUpdated(true)
        dispatch(
          updateProfile(phone, buildingName, colonyName, city, state, pincode)
        )
      } else {
        setData(response)
      }
    }
  }

  const setData = (response) => {
    setLibraryName(response.data.libraryName)
    setPhone(response.data.phone)
    setBuildingName(response.data.addr.buildingName)
    setColonyName(response.data.addr.colonyName)
    setCity(response.data.addr.city)
    setState(response.data.addr.state)
    setpincode(response.data.addr.pincode)
  }

  useEffect(() => {
    console.log(window.location.pathname)
    console.log('in func')
    console.log(counter)
    console.log('response is')
    console.log(response)
    if (window.location.pathname === '/edit-profile' && counter === 0) {
      console.log('in func')
      console.log(counter)
      setCounter(1)
      getData()
    }
    if (response && response.status === 'success' && infoReceived) {
      console.log('in useeffect of update')
      console.log(response)
      setInfoReceived(false)
      setData(response)
    } else if (response && response.status === 'error' && infoReceived) {
      setInfoReceived(false)
      alert(response.data)
    } else if (error && infoReceived) {
      setInfoReceived(false)
      alert(error)
    }

    if (response1 && response1.status === 'success' && infoUpdated) {
      console.log('after update response')
      setInfoUpdated(false)
      setData(response1)
      alert('Info Updated')
    } else if (response1 && response1.status === 'error' && infoUpdated) {
      setInfoUpdated(false)
      alert(response1.error)
    } else if (error1 && infoUpdated) {
      setInfoUpdated(false)
      alert(error1)
    }
  }, [
    window.location.pathname,
    loading,
    response,
    error,
    loading1,
    error1,
    response1,
  ])

  return (
    <div className="outer-update">
      <div className="box-update">
        <h3 style={{ textAlign: 'center', marginTop: '15px' }}>Edit Profile</h3>
        <div style={{ marginLeft: '10px' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Library Name
          </span>
          {'   '}:{'    '}
          {libraryName}
        </div>
        <div style={{ marginTop: '10px' }} className="form-group">
          <label
            style={{ marginLeft: '10px', marginBottom: '5px' }}
            className="label1"
            htmlFor="phone">
            phone
          </label>
          <input
            type="number"
            id="phone"
            onChange={(e) => {
              setPhone(e.target.value)
            }}
            value={phone}
            className="form-control"
            placeholder="enter the phone no"
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
            value={buildingName}
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
            value={colonyName}
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
            value={city}
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
            value={state}
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
              setpincode(e.target.value)
            }}
            value={pincode}
            type="number"
            id="pincode"
            className="form-control"
            placeholder="enter the pincode no"
            required
          />
        </div>
        <div className="d-grid gap-2" style={{ marginTop: '20px' }}>
          <button
            onClick={onUpdate}
            style={{ marginBottom: '10px' }}
            className="btn btn-primary"
            type="button">
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfileScreen
