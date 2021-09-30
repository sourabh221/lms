import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activationUserFunc, getUsersFunc } from '../action/librarianUserAction'
import SearchUser from '../components/User/SearchUser'
import TableComponent from '../components/User/TableComponent'

const UserScreen = (props) => {
  const userList = useSelector((store) => store.userList)
  const userActivation = useSelector((store) => store.userActivation)

  const [data, setdata] = useState([])
  const [counter, setCounter] = useState(0)
  const [visible, setvisible] = useState(false)
  const [activationBtn, setActivationBtn] = useState(false)

  const [usersFetched, setusersFetched] = useState(false)
  const [userActivating, setuserActivating] = useState(false)

  const dispatch = useDispatch()

  const { loading, error, response } = userList

  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = userActivation

  const setusers = (value) => {
    let count = 0
    setdata(
      value.map((user) => {
        count = count + 1
        return {
          id: count,
          user: user,
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
    setusersFetched(true)
    dispatch(getUsersFunc())
  }

  const SearchuserMethod = (value, type) => {
    console.log('the value is' + value + ' and type is ' + type)
    if (value == null) {
      setusers(response.data)
    } else {
      if (type === 'name') {
        setusers(
          response.data.filter((user) => {
            let name = user.firstName + ' ' + user.lastName
            return name.includes(value)
          })
        )
      }
      if (type === 'email') {
        setusers(
          response.data.filter((user) => {
            return user.email.includes(value)
          })
        )
      }
    }
  }

  const ActivateDeactivate = (id) => {
    setuserActivating(true)
    dispatch(activationUserFunc(id))
    setActivationBtn(false)
  }

  useEffect(() => {
    if (counter === 0) {
      console.log('in func')
      console.log(counter)
      setCounter(1)
      getData()
    }

    if (response && response.status === 'success' && usersFetched) {
      console.log(response)
      setusers(response.data)
      setusersFetched(false)
    } else if (response && response.status === 'error' && usersFetched) {
      alert(response.data)
      setusersFetched(false)
    } else if (error && usersFetched) {
      alert(error)
      setusersFetched(false)
    }

    if (response1 && response1.status === 'success' && userActivating) {
      console.log(response1)
      setuserActivating(false)
      if (!activationBtn) {
        if (response1.data.isActive != null && response1.data.isActive) {
          alert('user is activated')
        } else {
          alert('user is deactivated')
        }
        getData()
        setActivationBtn(true)
      }
    } else if (response1 && response1.status === 'error' && userActivating) {
      alert(response1.data)
      setuserActivating(false)
    } else if (error1 && userActivating) {
      alert(error1)
      setuserActivating(false)
    }
  }, [loading, error, response, loading1, error1, response1])

  return (
    <div className="user">
      <div style={{ marginBottom: '20px' }}>
        <span
          style={{ fontSize: '30px', fontWeight: 'bold' }}
          className="text-primary">
          user
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
              <SearchUser SearchuserMethod={SearchuserMethod} />
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
            <div className="text-danger">"users not available"</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserScreen
