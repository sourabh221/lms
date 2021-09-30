import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserReservationHistoriesFunc } from '../../../action/ReservationHistoryAction'

const ReturnBookHistoryList = (props) => {
  const [counter, setCounter] = useState(true)
  const [dataFetching, setDataFetching] = useState(false)
  const [reservationHistoryData, setReservationHistoryData] = useState([])

  const fetchUserReservationHistories = useSelector(
    (store) => store.fetchUserReservationHistories
  )
  const { response, loading, error } = fetchUserReservationHistories

  const dispatch = useDispatch()

  const onLoad = () => {
    setDataFetching(true)
    dispatch(fetchUserReservationHistoriesFunc())
  }

  const saveData = (values) => {
    let index = 0
    setReservationHistoryData(
      values.map((history) => {
        if (history.returnBookHistory) {
          console.log(history)
          index++
          return {
            index,
            history,
          }
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
    <div
      style={{ marginTop: '100px', textAlign: 'center' }}
      className="container">
      <div className="row">
        <div className="col-md-12">
          {reservationHistoryData.length !== 0 ? (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>sr no</th>
                  <th>Reservation Id</th>
                  <th>Last Date to Return</th>
                  <th>Returned Date</th>
                  <th>period</th>
                  <th>Book Title</th>
                  <th>Librarian Id</th>
                </tr>
              </thead>
              <tbody>
                {reservationHistoryData.map((history) => {
                  if (history) {
                    return (
                      <tr key={history.index}>
                        <td>{history.index}</td>
                        <td>{history.history.reservation_id}</td>
                        <td>
                          {
                            history.history.returnBookHistory
                              .last_date_to_return
                          }
                        </td>
                        <td>{history.history.returnBookHistory.returned_on}</td>
                        <td>{history.history.period}</td>
                        <td>{history.history.bookDetails.book.bookTitle}</td>
                        <td>{history.history.returnBookHistory.librarianId}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-danger">
              Return book History record is not available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReturnBookHistoryList
