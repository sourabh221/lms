import { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'

const CheckOutHeader = (props) => {
  const [checkOutsVisible, setCheckOutsVisible] = useState(true)
  const [historyVisible, setHistoryVisible] = useState(false)
  const [optionaString, setOptionaString] = useState('checkOutList')
  const [counter, setCounter] = useState(0)

  const showCheckOuts = () => {
    let bTrue = true
    let bFalse = false
    let oString = 'checkOutList'
    setCheckOutsVisible(bTrue)
    setHistoryVisible(bFalse)
    setOptionaString(oString)
    showContent()
  }

  const showCheckOutHistory = () => {
    let bTrue = true
    let bFalse = false
    let oString = 'checkOutHistory'

    setCheckOutsVisible(bFalse)
    setHistoryVisible(bTrue)
    setOptionaString(oString)
    showContent()
  }

  const showContent = () => {
    console.log(optionaString)
    if (checkOutsVisible) {
      props.showContent(optionaString)
    } else {
      props.showContent(optionaString)
    }
  }
  useEffect(() => {}, [optionaString, checkOutsVisible, historyVisible])

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '50px', marginTop: '10px' }}>
        <div className="col-md-1"></div>
        <div className="col-md-2">
          {checkOutsVisible && (
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: '50px',
              }}>
              Check Out Records
            </div>
          )}

          {historyVisible && (
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: '50px',
              }}>
              Check Out History
            </div>
          )}
        </div>
        <div className="col-md-7"></div>
        <div className="col-md-2">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary">
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item
                onClick={() => {
                  showCheckOuts()
                }}>
                CheckOuts
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  showCheckOutHistory()
                }}>
                CheckOut History
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default CheckOutHeader
