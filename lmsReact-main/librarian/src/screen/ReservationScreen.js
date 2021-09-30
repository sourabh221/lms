import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLibraryReservationsFunc } from '../action/ReservationAction'
import { fetchActiveReservationByLibraryReducer } from '../reducer/ReservationReducer'

const ReservationList = (props) => {
  const [counter, setCounter] = useState(true)
  const [dataFetching, setDataFetching] = useState(false)
  const [reservationData, setReservationData] = useState([])

  const fetchActiveReservationByLibrary = useSelector(
    (store) => store.fetchActiveReservationByLibrary
  )
  const { response, loading, error } = fetchActiveReservationByLibrary

  const dispatch = useDispatch()

  const onLoad = () => {
    setDataFetching(true)
    dispatch(fetchLibraryReservationsFunc())
  }

  const saveData = (values) => {
    let index = 0
    setReservationData(
      values.map((reservation) => {
        index++
        return {
          index,
          reservation,
        }
      })
    )

    console.log(
      values.map((reservation) => {
        index++
        return {
          index,
          reservation,
        }
      })
    )
  }

  useEffect(() => {
    if (counter) {
      setCounter(false)
      onLoad()
    }

    if (response && response.status === 'success' && dataFetching) {
      setDataFetching(false)
      console.log(response.data)
      saveData(response.data)
    } else if (response && response.status === 'error' && dataFetching) {
      setDataFetching(false)
      alert(response.data)
    } else if (error && dataFetching) {
      setDataFetching(false)
      alert(error)
    }
  }, [response, loading, error])

  return (
    <div>
      <div>
        <h3 style={{ marginTop: '50px', marginLeft: '50px' }}>Reservations</h3>
      </div>
      <div
        style={{ marginTop: '50px', textAlign: 'center' }}
        className="container">
        <div className="row">
          <div className="col-md-12">
            {reservationData.length !== 0 ? (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>sr no</th>
                    <th>user name</th>
                    <th>user email</th>
                    <th>period</th>
                    <th>Reservation Id</th>
                    <th>Book Title</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {reservationData.length != 0 &&
                    reservationData.map((reservation) => {
                      return (
                        <tr key={reservation.index}>
                          <td>{reservation.index}</td>
                          <td>
                            {reservation.reservation.user.firstName}{' '}
                            {reservation.reservation.user.lastName}
                          </td>
                          <td>{reservation.reservation.user.email}</td>
                          <td>{reservation.reservation.period}</td>
                          <td>{reservation.reservation.reservation_id}</td>
                          <td>
                            {reservation.reservation.bookDetails.book.bookTitle}
                          </td>
                          {reservation.reservation.active !== 1 ? (
                            <td>Yes</td>
                          ) : (
                            <td>No</td>
                          )}
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            ) : (
              <div className="text-danger">Reservations are not available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationList
