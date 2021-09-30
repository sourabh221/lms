import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Example from './Example'

const Header = (props) => {
  const librarySignin = useSelector((store) => store.librarySignin)

  const { loading, error, response } = librarySignin

  const history = useHistory()

  const dispatch = useDispatch()

  const [counter, setCounter] = useState(0)

  /*const LogOut = () => {
    dispatch(logout())
  }*/

  const goToHome = () => {
    history.push('/home')
  }

  const goToLibrarian = () => {
    history.push('/librarian')
  }

  const goToBook = () => {
    history.push('/book')
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
            <li style={{ marginLeft: '50px' }} className="nav-item ">
              <button
                className="nav-link active btn btn-light"
                aria-current="page"
                onClick={goToLibrarian}>
                Librarin
              </button>
            </li>
            <li style={{ marginLeft: '50px' }} className="nav-item">
              <button
                className="nav-link active btn btn-light"
                aria-current="page">
                Users
              </button>
            </li>
            <li style={{ marginLeft: '50px' }} className="nav-item">
              <button
                onClick={goToBook}
                className="nav-link active btn btn-light"
                aria-current="page">
                Book
              </button>
            </li>
          </ul>
        </div>

        <div style={{ marginRight: '30px' }} className="float-end">
          <Example />
        </div>
        {/* <div style={{ marginRight: '30px' }} className="float-end">
          <Link to="">
            <i className="far fa-user"></i>
          </Link>
        </div>
        <button onClick={LogOut} className="btn btn-outline-dark float-end">
          Logout
        </button>
        */}
      </div>
    </nav>
  )
}

export default Header
