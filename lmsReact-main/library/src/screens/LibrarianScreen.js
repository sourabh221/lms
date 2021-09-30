import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActivationLibrarian, GetLibrarians } from '../actions/LibrarianAction'
import SearchLibrarian from '../components/Librarian/SearchLibrarian'
import TableComponent from '../components/Librarian/TableComponent'

const LibrarianScreen = (props) => {
  const librarianList = useSelector((store) => store.librarianList)
  const librarianActivation = useSelector((store) => store.librarianActivation)

  const [data, setdata] = useState([])
  const [counter, setCounter] = useState(0)
  const [visible, setvisible] = useState(false)
  const [activationBtn, setActivationBtn] = useState(false)

  const [librariansFetched, setLibrariansFetched] = useState(false)
  const [librarianActivating, setLibrarianActivating] = useState(false)

  const dispatch = useDispatch()

  const { loading, error, response } = librarianList

  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = librarianActivation

  const setLibrarians = (value) => {
    let count = 0
    setdata(
      value.map((librarian) => {
        count = count + 1
        return {
          id: count,
          librarian: librarian,
        }
      })
    )
  }
  const searchBarClicked = () => {
    if (visible) {
      setvisible(false)
    } else {
      if (data.length != 0) {
        setvisible(true)
      }
    }
  }
  const getData = () => {
    setLibrariansFetched(true)
    dispatch(GetLibrarians())
  }

  const SearchLibrarianMethod = (value, type) => {
    console.log('the value is' + value + ' and type is ' + type)
    if (value == null) {
      setLibrarians(response.data)
    } else {
      if (type === 'name') {
        setLibrarians(
          response.data.filter((librarian) => {
            let name = librarian.firstName + ' ' + librarian.lastName
            return name.includes(value)
          })
        )
      }
      if (type === 'email') {
        setLibrarians(
          response.data.filter((librarian) => {
            return librarian.email.includes(value)
          })
        )
      }
    }
  }

  const ActivateDeactivate = (id) => {
    setLibrarianActivating(true)
    dispatch(ActivationLibrarian(id))
    setActivationBtn(false)
  }

  useEffect(() => {
    if (counter === 0) {
      console.log('in func')
      console.log(counter)
      setCounter(1)
      getData()
    }

    if (response && response.status === 'success' && librariansFetched) {
      console.log(response)
      setLibrarians(response.data)
      setLibrariansFetched(false)
    } else if (response && response.status === 'error' && librariansFetched) {
      alert(response.data)
      setLibrariansFetched(false)
    } else if (error && librariansFetched) {
      alert(error)
      setLibrariansFetched(false)
    }

    if (response1 && response1.status === 'success' && librarianActivating) {
      console.log(response1)
      setLibrarianActivating(false)
      if (!activationBtn) {
        if (response1.data.isActive != null && response1.data.isActive) {
          alert('user is activated')
        } else {
          alert('user is deactivated')
        }
        getData()
        setActivationBtn(true)
      }
    } else if (
      response1 &&
      response1.status === 'error' &&
      librarianActivating
    ) {
      alert(response1.data)
      setLibrarianActivating(false)
    } else if (error1 && librarianActivating) {
      alert(error1)
      setLibrarianActivating(false)
    }
  }, [loading, error, response, loading1, error1, response1])

  return (
    <div className="librarian">
      <div style={{ marginBottom: '20px' }}>
        <span
          style={{ fontSize: '30px', fontWeight: 'bold' }}
          className="text-primary">
          Librarian
        </span>
        <span className="float-end">
          <button
            onClick={searchBarClicked}
            className="btn btn-outline-primary">
            <i className="fas fa-search"></i>
          </button>
        </span>
      </div>
      <div>
        <div>
          {visible && (
            <div style={{ marginBottom: '30px' }}>
              <SearchLibrarian SearchLibrarianMethod={SearchLibrarianMethod} />
            </div>
          )}
        </div>
        <div>
          {data.length != 0 ? (
            <TableComponent
              data={data}
              ActivateDeactivate={ActivateDeactivate}
            />
          ) : (
            <div className="text-danger">"librarians not available"</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LibrarianScreen
