import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { issueLibrarianCheckOutBookFunc } from '../action/CheckOutBookAction'
import { fetchLibrariesReservationHistoriesFunc } from '../action/ReservationHistoryAction'

const CheckOutBookScreen = (props) => {
  const [counter, setCounter] = useState(true)
  const [dataFetching, setDataFetching] = useState(false)
  const [reservationHistoryData, setReservationHistoryData] = useState([])
  const [bookCheckingOut, setBookCheckingOut] = useState(false)

  const fetchReservationHistoryByLibrary = useSelector(
    (store) => store.fetchReservationHistoryByLibrary
  )
  const { response, loading, error } = fetchReservationHistoryByLibrary

  const checkOutBookByLibrarian = useSelector(
    (store) => store.checkOutBookByLibrarian
  )

  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = checkOutBookByLibrarian

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

  const onCheckOutBook = (id) => {
    if (window.confirm('are u sure u wanna check out')) {
      setBookCheckingOut(true)
      dispatch(issueLibrarianCheckOutBookFunc(id))
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
  }, [response, loading, error, response1, loading1, error1])
  return (
    <div>
      <div style={{ marginTop: '50px', marginLeft: '110px' }}>
        <h3> Check Out List</h3>
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
                          <td>
                            {history.history.user.firstName}{' '}
                            {history.history.user.lastName}
                          </td>
                          <td>{history.history.user.email}</td>
                          <td>{history.history.reservation_date}</td>
                          <td>
                            {
                              history.history.checkOutBook
                                .reservation_expiry_date
                            }
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
                            {history.history.checkOutBook.userCheckedOut &&
                            history.history.checkOutBook.libCheckedOut ? (
                              <div> book issued </div>
                            ) : history.history.checkOutBook.userCheckedOut ? (
                              <button
                                className="btn btn-outline-info"
                                onClick={() => {
                                  onCheckOutBook(
                                    history.history.checkOutBook.checkout_id
                                  )
                                }}>
                                checkOut
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
                Checking out book record is not available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutBookScreen
