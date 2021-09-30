import { useEffect } from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfile, logout } from '../actions/LibraryAction'
import ModelBody from './ModelBody'

const Example = (props) => {
  const [infoReceived, setInfoReceived] = useState(false)
  const libraryProfile = useSelector((store) => store.libraryProfile)

  const { loading, error, response } = libraryProfile

  const dispatch = useDispatch()

  const history = useHistory()

  const [data, setData] = useState()

  const LogOut = () => {
    if (window.confirm('you wanna logout')) {
      dispatch(logout())
    }
  }

  const EditClick = () => {
    setShow(false)
    history.push('/edit-profile')
  }

  const getProfiler = () => {
    dispatch(getProfile())
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
    } else if (response && response.status === 'error' && infoReceived) {
      setInfoReceived(false)
      alert(response.data)
    } else if (error && infoReceived) {
      setInfoReceived(false)
      alert(error)
    }
  }, [loading, response, error])

  return (
    <div>
      <div onClick={handleShow}>
        <i className="fas fa-user"></i>
      </div>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModelBody data={data} />
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
