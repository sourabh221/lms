import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserReservationHistoriesFunc } from '../../../action/ReservationHistoryAction'
import { issueUserReturnBookFunc } from '../../../action/ReturnBookAction'

const ReturnBookList = (props) => {
  const [counter, setCounter] = useState(true)
  const [dataFetching, setDataFetching] = useState(false)
  const [reservationHistoryData, setReservationHistoryData] = useState([])
  const [bookReturning, setBookReturning] = useState(false)

  const fetchUserReservationHistories = useSelector(
    (store) => store.fetchUserReservationHistories
  )
  const { response, loading, error } = fetchUserReservationHistories

  const issueUserReturnBook = useSelector((store) => store.issueUserReturnBook)

  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = issueUserReturnBook

  const dispatch = useDispatch()

  const onLoad = () => {
    setDataFetching(true)
    dispatch(fetchUserReservationHistoriesFunc())
  }

  const saveData = (values) => {
    let index = 0
    setReservationHistoryData(
      values.map((history) => {
        if (history.returnBook) {
          index++
          return {
            index,
            history,
          }
        } else {
          return null
        }
      })
    )
  }
  const returnBookFunc = (id) => {
    if (window.confirm('are u sure u want to return the book')) {
      setBookReturning(true)
      dispatch(issueUserReturnBookFunc(id))
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

    if (response1 && response1.status === 'success' && bookReturning) {
      setBookReturning(false)
      console.log(response1.data)
      alert(response1.data)
      onLoad()
    } else if (response1 && response1.status === 'error' && bookReturning) {
      setBookReturning(false)
      console.log(response1.data)
      alert(response1.data)
    } else if (error1 && bookReturning) {
      setBookReturning(false)
      alert(error1)
    }
  }, [response, loading, error, response1, loading1, error1])
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
                  <th>CheckedOut Date</th>
                  <th>Last Date to Return</th>
                  <th>period</th>
                  <th>Book Title</th>
                  <th> is returned</th>
                  <th>Action</th>
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
                          {history.history.checkOutBookHistory.checkout_date}
                        </td>
                        {history.history.returnBook.last_date_to_return ? (
                          <td>
                            {history.history.returnBook.last_date_to_return}
                          </td>
                        ) : (
                          <td>-</td>
                        )}
                        <td>{history.history.period}</td>
                        <td>{history.history.bookDetails.book.bookTitle}</td>
                        <td>
                          {history.history.returnBook.isReturn &&
                          history.history.returnBook.libIsReturn ? (
                            <div style={{ color: 'green' }}>Yes</div>
                          ) : (
                            <div>
                              {history.history.returnBook.isReturn ? (
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
                          {history.history.returnBook.isReturn ? (
                            <div>wait</div>
                          ) : (
                            <button
                              onClick={() => {
                                returnBookFunc(
                                  history.history.returnBook.return_book_id
                                )
                              }}
                              className="btn btn-outline-success">
                              return
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-danger">
              Return book record is not available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReturnBookList
