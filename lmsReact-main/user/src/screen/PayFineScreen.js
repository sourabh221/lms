import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {
  calculateFineOfUserFunc,
  payFineOfUserFunc,
} from '../action/ReturnBookAction'
import '../css/payFine.css'

const PayFineScreen = (props) => {
  const [counter, setCounter] = useState(true)
  const [fineCalculating, setFineCalculating] = useState(false)
  const [fine, setFine] = useState(0)
  const [userFine, setUserFine] = useState(0)
  const [finePaying, setFinePaying] = useState(false)

  const calculateFineOfUser = useSelector((store) => store.calculateFineOfUser)
  const { response, loading, error } = calculateFineOfUser

  const payFineOfUser = useSelector((store) => store.payFineOfUser)

  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = payFineOfUser

  const dispatch = useDispatch()
  const history = useHistory()

  const onLoad = () => {
    setFineCalculating(true)
    dispatch(calculateFineOfUserFunc())
  }

  const payFine = () => {
    if (fine === userFine) {
      if (window.confirm('are u sure u')) {
        setFinePaying(true)
        dispatch(payFineOfUserFunc())
      }
    } else {
      alert('please input correct amount')
    }
  }

  useEffect(() => {
    if (counter) {
      setCounter(false)
      onLoad()
    }

    if (response && response.status === 'success' && fineCalculating) {
      setFineCalculating(false)
      console.log(response.data)
      setFine(response.data)
    } else if (response && response.status === 'error' && fineCalculating) {
      setFineCalculating(false)
      history.push('/return-book')
      alert(response.data)
    } else if (error && fineCalculating) {
      setFineCalculating(false)
      history.push('/return-book')
      alert(error)
    }

    if (response1 && response1.status === 'success' && finePaying) {
      setFinePaying(false)
      console.log(response1.data)
      history.push('/return-book')
      alert(response1.data)
    } else if (response1 && response1.status === 'error' && finePaying) {
      setFinePaying(false)
      console.log(response1.data)
      alert(response1.data)
    } else if (error1 && finePaying) {
      setFinePaying(false)
      alert(error1)
    }
  }, [response, loading, error, response1, loading1, error1])

  return (
    <div>
      {fine !== 0 && (
        <div className="col-md-4 boxFine">
          <h3 style={{ textAlign: 'center' }}>Pay Fine</h3>
          <div style={{ marginTop: '10px' }} className="form-group">
            <label
              style={{ marginLeft: '10px', marginBottom: '5px' }}
              className="label1"
              htmlFor="fine">
              Fine
            </label>
            <input
              onChange={(e) => {
                setUserFine(e.target.value)
              }}
              type="number"
              id="fine"
              className="form-control"
              placeholder={fine !== 0 && 'enter the fine ' + fine}
              required
            />
          </div>
          <div className="d-grid gap-2" style={{ marginTop: '20px' }}>
            <button
              onClick={payFine}
              style={{ marginBottom: '10px' }}
              className="btn btn-success"
              type="button">
              Pay Fine
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PayFineScreen
