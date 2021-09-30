import { base64StringToBlob } from 'blob-util'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { LibrarianImageRequester } from '../../../actions/LibrarianAction'
import InfoModalBody from './InfoModalBody'

const InfoModal = (props) => {
  const librarianImageRequest = useSelector(
    (store) => store.librarianImageRequest
  )

  const dispatch = useDispatch()
  const { response, error, loading } = librarianImageRequest
  const history = useHistory()

  const [data, setData] = useState(null)

  const EditClick = () => {
    setShow(false)
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    console.log(props.id)
    dispatch(LibrarianImageRequester(props.id))
  }

  useEffect(() => {
    if (response && typeof response.data === 'string') {
      console.log(typeof response.data)
      console.log(response)
      const byteCharacters = atob(response.data)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'image/*' })

      setData(blob)
    } else if (response && typeof response.data === 'object') {
      alert(response.data.data)
    } else if (error) {
      alert(error)
    }
  }, [response, loading, error])

  return (
    <div>
      <button onClick={handleShow} className="btn btn-outline-dark">
        <i className="fas fa-user-tie"></i>
      </button>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InfoModalBody data={data} userInfo={props.user} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={EditClick} className="btn btn-outline-info ">
            Full Info
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default InfoModal
