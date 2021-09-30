import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUserReservationFunc,
  fetchUserReservationsFunc,
} from '../../../action/ReservationAction'

const ReservationList = (props) => {
  const [counter, setCounter] = useState(true)
  const [dataFetching, setDataFetching] = useState(false)
  const [reservationData, setReservationData] = useState([])
  const [deleteRequesting, setDeleteRequesting] = useState(false)

  const fetchUserReservations = useSelector(
    (store) => store.fetchUserReservations
  )
  const { response, loading, error } = fetchUserReservations

  const deleteUserReservation = useSelector(
    (store) => store.deleteUserReservation
  )

  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = deleteUserReservation
  const dispatch = useDispatch()

  const onLoad = () => {
    setDataFetching(true)
    dispatch(fetchUserReservationsFunc())
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

  const deleteReservation = (id) => {
    if (window.confirm('are u sure u want to delete reservation')) {
      setDeleteRequesting(true)
      dispatch(deleteUserReservationFunc(id))
    }
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

    if (response1 && response1.status === 'success' && deleteRequesting) {
      console.log(response1.data)
      alert(response1.data)
      setDeleteRequesting(false)
      onLoad()
    } else if (response1 && response1.status === 'error' && deleteRequesting) {
      console.log(response1)
      setDeleteRequesting(false)
      alert(response1.data)
    } else if (error1 && deleteRequesting) {
      setDeleteRequesting(false)
      alert(error1)
    }
  }, [response, loading, error, response1, loading1, error1])

  return (
    <div
      style={{ marginTop: '100px', textAlign: 'center' }}
      className="container">
      <div className="row">
        <div className="col-md-8">
          {reservationData.length !== 0 ? (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>sr no</th>
                  <th>period</th>
                  <th>Reservation Id</th>
                  <th>Book Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reservationData.length != 0 &&
                  reservationData.map((reservation) => {
                    return (
                      <tr key={reservation.index}>
                        <td>{reservation.index}</td>
                        <td>{reservation.reservation.period}</td>
                        <td>{reservation.reservation.reservation_id}</td>
                        <td>
                          {reservation.reservation.bookDetails.book.bookTitle}
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-dark"
                            onClick={() => {
                              deleteReservation(
                                reservation.reservation.reservation_id
                              )
                            }}>
                            delete
                          </button>
                        </td>
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
  )
}

export default ReservationList
