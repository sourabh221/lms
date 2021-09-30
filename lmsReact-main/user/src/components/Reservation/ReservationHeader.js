import { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'

const ReservationHeader = (props) => {
  const [reservationsVisible, setReservationsVisible] = useState(true)
  const [addReservationVisible, setAddReservationVisible] = useState(false)
  const [historyVisible, setHistoryVisible] = useState(false)
  const [counter, setCounter] = useState(0)

  const showReservations = () => {
    setReservationsVisible(true)
    setAddReservationVisible(false)
    setHistoryVisible(false)
    showContent()
  }
  const showMakeReservation = () => {
    setReservationsVisible(false)
    setAddReservationVisible(true)
    setHistoryVisible(false)
  }
  const showReservationHistory = () => {
    setReservationsVisible(false)
    setAddReservationVisible(false)
    setHistoryVisible(true)
    showContent()
  }

  const showContent = () => {
    if (reservationsVisible) {
      props.showContent('reservationList')
    } else if (addReservationVisible) {
      props.showContent('makeReservation')
    } else {
      props.showContent('reservationHistory')
    }
  }

  const onLoad = () => {
    console.log('in onload')
    console.log(props)
    if (props.lbdTrue) {
      console.log('setting make reservation')
      setReservationsVisible(false)
      setAddReservationVisible(true)
      setHistoryVisible(false)
    }
  }

  useEffect(() => {
    if (counter === 0) {
      let value = counter
      setCounter(value + 1)
      onLoad()
    }
    showContent()
  }, [reservationsVisible, addReservationVisible, historyVisible])
  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '50px', marginTop: '10px' }}>
        <div className="col-md-1"></div>
        <div className="col-md-2">
          {reservationsVisible && (
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: '50px',
              }}>
              Reservations
            </div>
          )}
          {addReservationVisible && (
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: '50px',
              }}>
              Make Reservation
            </div>
          )}

          {historyVisible && (
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: '50px',
              }}>
              Reservation History
            </div>
          )}
        </div>
        <div className="col-md-7"></div>
        <div className="col-md-2">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary">
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item onClick={showReservations}>
                Reservations
              </Dropdown.Item>
              <Dropdown.Item onClick={showMakeReservation}>
                Make Reservation
              </Dropdown.Item>
              <Dropdown.Item onClick={showReservationHistory}>
                Reservation History
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default ReservationHeader
