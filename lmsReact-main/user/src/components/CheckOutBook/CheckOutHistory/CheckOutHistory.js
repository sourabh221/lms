import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserReservationHistoriesFunc } from '../../../action/ReservationHistoryAction'

const CheckOutHistory = (props) => {
  const [counter, setCounter] = useState(true)
  const [dataFetching, setDataFetching] = useState(false)
  const [historyData, setHistoryData] = useState([])

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
    setHistoryData(
      values.map((history) => {
        index++
        return {
          index,
          history,
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
          {historyData.length !== 0 ? (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>sr no</th>
                  <th>CheckOut Id</th>
                  <th>checkout Date</th>
                  <th>return Date</th>
                  <th>period</th>
                  <th>Book Title</th>
                  <th> is Issued</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((history) => {
                  if (history.history.checkOutBookHistory != null) {
                    return (
                      <tr key={history.index}>
                        <td>{history.index}</td>
                        <td>
                          {history.history.checkOutBookHistory.checkout_id}
                        </td>
                        {history.history.checkOutBookHistory.checkout_date ===
                        null ? (
                          <td> - </td>
                        ) : (
                          <td>
                            {history.history.checkOutBookHistory.checkout_date}
                          </td>
                        )}
                        {history.history.checkOutBookHistory.return_date ===
                        null ? (
                          <td> - </td>
                        ) : (
                          <td>
                            {history.history.checkOutBookHistory.return_date}
                          </td>
                        )}
                        <td>{history.history.period}</td>
                        <td>{history.history.bookDetails.book.bookTitle}</td>
                        {history.history.checkOutBookHistory.issued ? (
                          <td style={{ color: 'green' }}>yes</td>
                        ) : (
                          <td style={{ color: 'red' }}>No</td>
                        )}
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-danger">
              Check out History is not available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckOutHistory
