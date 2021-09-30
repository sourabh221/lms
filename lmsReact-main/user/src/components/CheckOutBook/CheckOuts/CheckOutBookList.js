import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUserCheckOutBookFunc,
  issueUserCheckOutBookFunc,
} from '../../../action/CheckOutBookAction'
import { fetchUserReservationHistoriesFunc } from '../../../action/ReservationHistoryAction'

const CheckOutBookList = (props) => {
  const [counter, setCounter] = useState(true)
  const [dataFetching, setDataFetching] = useState(false)
  const [reservationHistoryData, setReservationHistoryData] = useState([])
  const [bookCheckingOut, setBookCheckingOut] = useState(false)
  const [bookDeleting, setBookDeleting] = useState(false)

  const fetchUserReservationHistories = useSelector(
    (store) => store.fetchUserReservationHistories
  )
  const { response, loading, error } = fetchUserReservationHistories

  const issueUserCheckOutBook = useSelector(
    (store) => store.issueUserCheckOutBook
  )

  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = issueUserCheckOutBook

  const deleteUserCheckOutBook = useSelector(
    (store) => store.deleteUserCheckOutBook
  )

  const {
    loading: loading2,
    error: error2,
    response: response2,
  } = deleteUserCheckOutBook

  const dispatch = useDispatch()

  const onLoad = () => {
    setDataFetching(true)
    dispatch(fetchUserReservationHistoriesFunc())
  }

  const saveData = (values) => {
    let index = 0
    setReservationHistoryData(
      values.map((history) => {
        index++
        return {
          index,
          history,
        }
      })
    )
  }

  const onCheckOutBook = (id) => {
    if (window.confirm('are u sure u wanna check out')) {
      setBookCheckingOut(true)
      dispatch(issueUserCheckOutBookFunc(id))
    }
  }

  const onDeleteBookRecord = (id) => {
    if (window.confirm('are u sure u wanna delete book record')) {
      setBookDeleting(true)
      dispatch(deleteUserCheckOutBookFunc(id))
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
    if (response1 && response1.status === 'success' && bookCheckingOut) {
      setBookCheckingOut(false)
      console.log(response1.data)
      alert(response1.data)
      onLoad()
    } else if (response1 && response1.status === 'error' && bookCheckingOut) {
      setBookCheckingOut(false)
      console.log(response1.data)
      alert(response1.data)
    } else if (error1 && bookCheckingOut) {
      setBookCheckingOut(false)
      alert(error1)
    }

    if (response2 && response2.status === 'success' && bookDeleting) {
      setBookDeleting(false)
      console.log(response2.data)
      alert(response2.data)
      onLoad()
    } else if (response2 && response2.status === 'error' && bookDeleting) {
      setBookDeleting(false)
      console.log(response2.data)
      alert(response2.data)
    } else if (error2 && bookDeleting) {
      setBookDeleting(false)
      alert(error2)
    }
  }, [
    response,
    loading,
    error,
    response1,
    loading1,
    error1,
    response2,
    loading2,
    error2,
  ])
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
                  <th>Reservation Date</th>
                  <th>Expiry Date</th>
                  <th>period</th>
                  <th>Book Title</th>
                  <th> is Checked Out</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reservationHistoryData.map((history) => {
                  if (history.history.checkOutBook) {
                    return (
                      <tr key={history.index}>
                        <td>{history.index}</td>
                        <td>{history.history.reservation_id}</td>
                        <td>{history.history.reservation_date}</td>
                        <td>
                          {history.history.checkOutBook.reservation_expiry_date}
                        </td>
                        <td>{history.history.period}</td>
                        <td>{history.history.bookDetails.book.bookTitle}</td>
                        <td>
                          {history.history.checkOutBook.userCheckedOut &&
                          history.history.checkOutBook.libCheckedOut ? (
                            <div style={{ color: 'green' }}>success</div>
                          ) : (
                            <div>
                              {history.history.checkOutBook.userCheckedOut ? (
                                <div style={{ color: 'red' }}>
                                  waiting for librarian
                                </div>
                              ) : (
                                <div style={{ color: 'red' }}>
                                  waiting for user
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          {history.history.checkOutBook
                            .userCheckedOut ? null : (
                            <button
                              className="btn btn-outline-info"
                              onClick={() => {
                                onCheckOutBook(
                                  history.history.checkOutBook.checkout_id
                                )
                              }}>
                              checkOut
                            </button>
                          )}

                          <button
                            style={{ marginLeft: '10px' }}
                            className="btn btn-outline-danger"
                            onClick={() => {
                              onDeleteBookRecord(
                                history.history.checkOutBook.checkout_id
                              )
                            }}>
                            delete
                          </button>
                        </td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-danger">
              Checking out book record is not available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckOutBookList
