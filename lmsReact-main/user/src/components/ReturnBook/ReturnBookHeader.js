import { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router'

const ReturnBookHeader = (props) => {
  const [returnBookVisible, setReturnBookVisible] = useState(true)
  const [historyVisible, setHistoryVisible] = useState(false)

  const history = useHistory()

  const showReturnBooks = () => {
    setReturnBookVisible(true)
    setHistoryVisible(false)
    showContent()
  }

  const showReturnBookHistory = () => {
    setReturnBookVisible(false)
    setHistoryVisible(true)
    showContent()
  }

  const showContent = () => {
    if (returnBookVisible) {
       props.showContent('returnBookList')
    } else {
      props.showContent('returnBookHistory')
    }
  }

  const goToPayFine = () => {
    history.push('/pay-fine')
  }

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '50px', marginTop: '10px' }}>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          {returnBookVisible && (
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: '50px',
              }}>
              Return Book Records
            </div>
          )}

          {historyVisible && (
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: '50px',
              }}>
              Return Book History
            </div>
          )}
        </div>
        <div className="col-md-6">
          {returnBookVisible && (
            <button
              onClick={goToPayFine}
              className="btn btn-outline-warning float-end">
              Pay Fine
            </button>
          )}
        </div>
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
                  showReturnBooks()
                }}>
                Return Books Record
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  showReturnBookHistory()
                }}>
                Return Books History
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default ReturnBookHeader
