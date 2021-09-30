import { useEffect } from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfileFunc, getProfilePicFunc, logout } from '../action/UserAction'
import ModelBody from './ModelBody'

const Example = (props) => {
  const [infoReceived, setInfoReceived] = useState(false)
  const [profilePicReceived, setProfilePicReceived] = useState(false)
  const [data, setData] = useState()
  const [profilePic, setProfilePic] = useState(null)

  const userProfileRequest = useSelector((store) => store.userProfileRequest)

  const { loading, error, response } = userProfileRequest

  const userProfilePicRequest = useSelector(
    (store) => store.userProfilePicRequest
  )
  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = userProfilePicRequest

  const dispatch = useDispatch()

  const history = useHistory()

  const LogOut = () => {
    if (window.confirm('you wanna logout')) {
      dispatch(logout())
    }
  }

  const EditClick = () => {
    setShow(false)
    const myData = {
      data,
      profilePic,
    }
    history.push('/edit-profile', myData)
  }

  const getProfiler = () => {
    setInfoReceived(true)
    dispatch(getProfileFunc())
  }
  const requestProfilePic = () => {
    setProfilePicReceived(true)
    console.log('in requestProfilePic')
    dispatch(getProfilePicFunc())
  }
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setInfoReceived(true)
    getProfiler()
    setShow(true)
  }

  useEffect(() => {
    if (response && response.status === 'success' && infoReceived) {
      setInfoReceived(false)
      setData(response.data)
      console.log(response.data)
      requestProfilePic()
    } else if (response && response.status === 'error' && infoReceived) {
      setInfoReceived(false)
      alert(response.data)
    } else if (error && infoReceived) {
      setInfoReceived(false)
      alert(error)
    }

    if (response1 && profilePicReceived) {
      console.log('image successfully')
      console.log(typeof response1.data)
      console.log(response1)
      const byteCharacters = atob(response1.data)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'image/*' })

      setProfilePic(blob)
      setProfilePicReceived(false)
    } else if (
      response1 &&
      response1.status === 'error' &&
      profilePicReceived
    ) {
      alert(response1.data.data)
      setProfilePicReceived(false)
    } else if (error1 && profilePicReceived) {
      alert(error1)
      setProfilePicReceived(false)
    }
  }, [loading, response, error, loading1, response1, error1])

  return (
    <div>
      <div onClick={handleShow} style={{ fontSize: '20px' }}>
        <i className="fas fa-user"></i>
      </div>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModelBody data={data} profilePic={profilePic} />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={LogOut}
            className="btn btn-outline-dark "
            style={{ marginRight: '330px' }}>
            Logout
          </button>
          <button onClick={EditClick} className="btn btn-outline-info ">
            Edit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Example
