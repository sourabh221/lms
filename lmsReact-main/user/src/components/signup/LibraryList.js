import { useEffect } from 'react'
import { useState } from 'react'

const LibraryList = (props) => {
  const [counter, setcounter] = useState(0)
  const [list, setlist] = useState([])
  const [visible, setvisible] = useState(false)

  const onClickRadio = (e) => {
    props.onClickRadio(e.target.value)
  }

  const onSelectPressed = () => {
    props.onSelectPressed()
    setvisible(false)
    setcounter(0)
  }
  useEffect(() => {
    if (window.location.pathname === '/signup' && counter === 0) {
      setcounter(1)
      let librarylist = props.list
      setlist(props.list)
      if (librarylist.length != 0) {
        setvisible(true)
      }
    }
  }, [props.list])
  return (
    <div>
      {visible && (
        <div>
          <div className="searchResultBox">
            {list.map((library) => {
              let idstring = 'flexRadioDefault' + library.id
              return (
                <div
                  style={{ padding: '3px' }}
                  key={library.serialNo}
                  className="form-check">
                  <input
                    onChange={onClickRadio}
                    className="form-check-input"
                    value={library.id}
                    type="radio"
                    name="flexRadioDefault"
                    id={idstring}
                  />
                  <label
                    style={{ marginLeft: '10px' }}
                    className="form-check-label"
                    htmlFor={idstring}>
                    {library.libraryName}
                  </label>
                </div>
              )
            })}
          </div>

          <button
            style={{ marginTop: '10px', width: '200px' }}
            className="btn btn-outline-success"
            onClick={onSelectPressed}>
            select
          </button>
        </div>
      )}
      {list.length == 0 && (
        <div className="text-danger">please enter valid library name</div>
      )}
    </div>
  )
}

export default LibraryList
