import { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

const SearchUser = (props) => {
  const [counter, setCounter] = useState(0)
  const [searchWord, setsearchWord] = useState('')
  const onName = () => {
    console.log('name clicked')
    setCounter(1)
  }

  const onEmail = () => {
    console.log('email clicked')
    setCounter(2)
  }

  const ModifySearchResult = (value, type) => {
    console.log('value is ' + value)
    if (value == null) {
      props.SearchuserMethod(null, null)
    } else {
      props.SearchuserMethod(value, type)
    }
  }

  return (
    <div>
      <DropdownButton
        style={{ marginLeft: '10px', marginBottom: '15px' }}
        id="dropdown-item-button"
        title="Search By">
        <Dropdown.Item as="button" onClick={onName}>
          Name
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={onEmail}>
          Email
        </Dropdown.Item>
      </DropdownButton>
      {counter === 1 && (
        <div style={{ marginTop: '10px' }} className="form-group">
          <label
            style={{ marginLeft: '10px', marginBottom: '10px' }}
            className="label1 text-body"
            htmlFor="userName">
            user Name
          </label>
          <input
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setsearchWord(null)
                ModifySearchResult(null)
              } else {
                setsearchWord(e.target.value)
                ModifySearchResult(e.target.value, 'name')
              }
            }}
            value={searchWord == null ? '' : searchWord}
            type="text"
            id="userName"
            className="form-control"
            placeholder="enter the user name"
            required
          />
        </div>
      )}
      {counter === 2 && (
        <div style={{ marginTop: '10px' }} className="form-group">
          <label
            style={{ marginLeft: '10px', marginBottom: '10px' }}
            className="label1 text-body"
            htmlFor="userEmail">
            user Email
          </label>
          <input
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setsearchWord(null)
                ModifySearchResult(null)
              } else {
                setsearchWord(e.target.value)
                ModifySearchResult(e.target.value, 'email')
              }
            }}
            value={searchWord == null ? '' : searchWord}
            type="text"
            id="userEmail"
            className="form-control"
            placeholder="enter the user email"
            required
          />
        </div>
      )}
    </div>
  )
}

export default SearchUser
