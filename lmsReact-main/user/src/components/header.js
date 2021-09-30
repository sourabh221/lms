import { useState } from 'react'
import { useEffect } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Example from './Example'

const Header = (props) => {
  const history = useHistory()

  const dispatch = useDispatch()

  const [counter, setCounter] = useState(0)

  const userSignin = useSelector((store) => store.userSignin)

  const { loading, error, response } = userSignin

  const goToHome = () => {
    history.push('/home')
  }

  const goToBooks = () => {
    history.push('/display-books')
  }

  const goToReservations = () => {
    history.push('/reservation')
  }

  const goToCheckOut = () => {
    history.push('/checkout')
  }

  const goToReturnBook = () => {
    history.push('/return-book')
  }

  useEffect(() => {
    console.log(counter)
    setCounter(counter + 1)
  }, [window.location.pathname, loading, response, error])

  if (
    window.location.pathname === '/signin' ||
    window.location.pathname === '/signup'
  ) {
    return null
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-brand btn btn-light" onClick={goToHome}>
          Library
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li style={{ marginLeft: '50px' }} className="nav-item">
              <button
                className="nav-link active btn btn-light"
                aria-current="page"
                onClick={goToBooks}>
                Books
              </button>
            </li>
            <li style={{ marginLeft: '50px' }} className="nav-item">
              <NavDropdown title="Action" id="basic-nav-dropdown" active="true">
                <NavDropdown.Item
                  onClick={() => {
                    goToReservations()
                  }}>
                  Reservation
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    goToCheckOut()
                  }}>
                  CheckOut
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    goToReturnBook()
                  }}>
                  Return
                </NavDropdown.Item>
              </NavDropdown>
            </li>
          </ul>
        </div>

        <div style={{ marginRight: '30px' }} className="float-end">
          <Example />
        </div>
      </div>
    </nav>
  )
}

export default Header
