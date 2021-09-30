import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLibrariesReservationHistoriesFunc } from '../action/ReservationHistoryAction'
import { returnBookByLibrarianFunc } from '../action/ReturnBookAction'

const ReturnBookScreen = (props) => {
  const [counter, setCounter] = useState(true)
  const [dataFetching, setDataFetching] = useState(false)
  const [reservationHistoryData, setReservationHistoryData] = useState([])
  const [returningBook, setReturningBook] = useState(false)

  const fetchReservationHistoryByLibrary = useSelector(
    (store) => store.fetchReservationHistoryByLibrary
  )
  const { response, loading, error } = fetchReservationHistoryByLibrary

  const returnBookByLibrarian = useSelector(
    (store) => store.returnBookByLibrarian
  )

  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = returnBookByLibrarian

  const dispatch = useDispatch()

  const onLoad = () => {
    setDataFetching(true)
    dispatch(fetchLibrariesReservationHistoriesFunc())
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

  const returnBookFunc = (id) => {
    if (window.confirm('are u sure')) {
      setReturningBook(true)
      dispatch(returnBookByLibrarianFunc(id))
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

    if (response1 && response1.status === 'success' && returningBook) {
      setReturningBook(false)
      console.log(response1.data)
      alert(response1.data)
      onLoad()
    } else if (response1 && response1.status === 'error' && returningBook) {
      setReturningBook(false)
      console.log(response1.data)
      alert(response1.data)
    } else if (error1 && returningBook) {
      setReturningBook(false)
      alert(error1)
    }
  }, [response, loading, error, response1, loading1, error1])
  return (
    <div>
      <div style={{ marginTop: '50px', marginLeft: '110px' }}>
        <button
          style={{ marginRight: '100px' }}
          className="btn btn-outline-info float-end">
          send Notifications
        </button>
        <h3> Return Book List</h3>
      </div>
      <div
        style={{ marginTop: '50px', textAlign: 'center' }}
        className="container">
        <div className="row">
          <div className="col-md-12">
            {reservationHistoryData.length !== 0 ? (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>sr no</th>
                    <th>user name</th>
                    <th>user email</th>
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
                    console.log('in map')
                    console.log(history)
                    if (history.history.returnBook) {
                      console.log(history)
                      return (
                        <tr key={history.index}>
                          <td>{history.index}</td>
                          <td>
                            {history.history.user.firstName}{' '}
                            {history.history.user.lastName}
                          </td>
                          <td>{history.history.user.email}</td>
                          <td>
                            {history.history.checkOutBookHistory.checkout_date}
                          </td>
                          <td>
                            {history.history.returnBook.last_date_to_return}
                          </td>
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
                              <button
                                onClick={() => {
                                  returnBookFunc(
                                    history.history.returnBook.return_book_id
                                  )
                                }}
                                className="btn btn-outline-success">
                                return
                              </button>
                            ) : (
                              <div>wait</div>
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
    </div>
  )
}

export default ReturnBookScreen
