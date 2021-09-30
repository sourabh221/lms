import { useEffect } from 'react'
import { useState } from 'react'
import '../../css/librarian.css'
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
    /*if (counter == 0) {
      setCounter(1)
      setdata(props.data)
    }*/
    setdata(props.data)
  }, [props.data])

  return (
    <table className="table table-striped table-bordered librariantbl">
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
                {user.librarian.firstName} {user.librarian.lastName}
              </td>
              <td>{user.librarian.email}</td>
              <td>{user.librarian.phone}</td>
              <td>
                <button
                  className={
                    user.librarian.isActive == null
                      ? 'btn btn-outline-success'
                      : 'btn btn-outline-danger'
                  }
                  onClick={() => {
                    ActivateDeactivate(user.librarian.serialNo)
                  }}>
                  {user.librarian.isActive == null ? 'Activate' : 'DeActivate'}
                </button>
              </td>
              <td>
                <InfoModal id={user.librarian.serialNo} user={user.librarian} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TableComponent
