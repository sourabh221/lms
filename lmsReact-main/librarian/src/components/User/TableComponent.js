import { useEffect } from 'react'
import { useState } from 'react'
import '../../css/user.css'
import InfoModal from './Modal/InfoModal'

const TableComponent = (props) => {
  const [data, setdata] = useState([])
  const [counter, setCounter] = useState(0)

  const ActivateDeactivate = (value) => {
    if (window.confirm('are u sure u want to activate/deactivate')) {
      props.ActivateDeactivate(value)
    }
  }

  useEffect(() => {
    setdata(props.data)
  }, [props.data])

  return (
    <table className="table table-striped table-bordered usertbl">
      <thead>
        <tr>
          <th>sr no</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.user.firstName} {user.user.lastName}
              </td>
              <td>{user.user.email}</td>
              <td>{user.user.phone}</td>
              <td>
                <button
                  className={
                    user.user.isActive == null
                      ? 'btn btn-outline-success'
                      : 'btn btn-outline-danger'
                  }
                  onClick={() => {
                    ActivateDeactivate(user.user.serialNo)
                  }}>
                  {user.user.isActive == null ? 'Activate' : 'DeActivate'}
                </button>
              </td>
              <td>
                <InfoModal id={user.user.serialNo} user={user.user} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TableComponent
