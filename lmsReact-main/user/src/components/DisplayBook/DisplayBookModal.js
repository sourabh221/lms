import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useHistory } from 'react-router'
import DisplayBookModalBody from './DisplayBookModalBody'

const DisplayBookModal = (props) => {
  const [show, setShow] = useState(false)

  const history = useHistory()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const makeReservation = () => {
    if (props.lbd) {
      const myData = {
        lbd: props.lbd,
      }
      history.push('/reservation', myData)
    }
  }

  return (
    <div>
      {props.lbd && (
        <div onClick={handleShow}>
          <img
            className="DisplayBooksImageClass"
            src={URL.createObjectURL(props.lbd.bookImage)}
          />
          <div
            style={{
              marginLeft: '5px',
              fontSize: '14px',
              fontWeight: 'bold',
              marginTop: '5px',
            }}>
            {props.lbd.lbd.book.bookTitle}
          </div>
          <div
            style={{
              marginLeft: '5px',
              fontSize: '14px',
              marginTop: '5px',
            }}>
            {props.lbd.lbd.book.bookAuthor}
          </div>
        </div>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.lbd && props.lbd.lbd.book.bookTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.lbd && <DisplayBookModalBody lbd={props.lbd} />}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-info" onClick={makeReservation}>
            Reserve Book
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DisplayBookModal
