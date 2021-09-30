import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import MakeReservation from '../components/Reservation/MakeReservation/MakeReservation'
import ReservationHeader from '../components/Reservation/ReservationHeader'
import ReservationHistory from '../components/Reservation/ReservationHistory/ReservationHistory'
import ReservationList from '../components/Reservation/Reservations/ReservationList'
import '../css/reservation.css'

const ReservationScreen = (props) => {
  const [optionString, setOptionString] = useState('reservationList')
  const [lbd, setLbd] = useState(null)
  const [counter, setCounter] = useState(true)
  const [lbdTrue, setLbdTrue] = useState(false)

  const location = useLocation()
  const showContent = (value) => {
    setOptionString(value)
  }
  useEffect(() => {
    if (counter) {
      if (location.state && location.state.lbd) {
        setOptionString('makeReservation')
        setLbd(location.state.lbd)
        setLbdTrue(true)
      }
      setCounter(false)
    }
  }, [location.state])
  return (
    <div>
      {lbd === null ? (
        <div>
          <ReservationHeader showContent={showContent} />
        </div>
      ) : (
        <div>
          <ReservationHeader showContent={showContent} lbdTrue={lbdTrue} />
        </div>
      )}
      {optionString === 'reservationList' && <ReservationList />}
      {optionString === 'makeReservation' && (
        <div>
          {lbd === null ? (
            <div>
              <MakeReservation />
            </div>
          ) : (
            <div>
              <MakeReservation lbd={lbd} />
            </div>
          )}
        </div>
      )}
      {optionString === 'reservationHistory' && <ReservationHistory />}
    </div>
  )
}

export default ReservationScreen
