import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'

const BookDisplayHeader = (props) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [iSBN, setISBN] = useState('')
  const [content, setContent] = useState('')

  const [authorVisible, setAuthorVisible] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [iSBNVisible, setISBNVisible] = useState(false)

  const showSelecteContent = (value) => {
    if (authorVisible) {
      props.showSelecteContent(value, 'author')
    } else if (titleVisible) {
      props.showSelecteContent(value, 'title')
    } else {
      props.showSelecteContent(value, 'iSBN')
    }
  }

  const MakeTitleVisible = () => {
    setTitleVisible(true)
    setAuthorVisible(false)
    setISBNVisible(false)
  }

  const MakeAuthorVisible = () => {
    setTitleVisible(false)
    setAuthorVisible(true)
    setISBNVisible(false)
  }

  const MakeISBNVisible = () => {
    setTitleVisible(false)
    setAuthorVisible(false)
    setISBNVisible(true)
  }

  return (
    <div className="container">
      <div className="row" style={{ height: '50px', marginTop: '10px' }}>
        <div
          style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '50px' }}
          className="col-md-2">
          Books
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-4">
          {titleVisible && (
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="enter the title of the book"
                onChange={(e) => {
                  showSelecteContent(e.target.value)
                }}
                required
              />
            </div>
          )}
          {authorVisible && (
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="enter the author of the book"
                onChange={(e) => {
                  showSelecteContent(e.target.value)
                }}
                required
              />
            </div>
          )}
          {iSBNVisible && (
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="enter the ISBN of the book"
                onChange={(e) => {
                  showSelecteContent(e.target.value)
                }}
                required
              />
            </div>
          )}
        </div>
        <div className="col-md-3">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary">
              Search By
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item onClick={MakeTitleVisible}>Title</Dropdown.Item>
              <Dropdown.Item onClick={MakeAuthorVisible}>Author</Dropdown.Item>
              <Dropdown.Item onClick={MakeISBNVisible}>ISBN</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default BookDisplayHeader
