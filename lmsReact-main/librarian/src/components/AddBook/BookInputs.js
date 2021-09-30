import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBookByTitleStringFunc } from '../../action/BookAction'
import BookList from './BookList'

const BookInputs = (props) => {
  const [bookTitle, setBookTitle] = useState('')
  const [bookCover, setBookCover] = useState(null)
  const [iSBN, setISBN] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookDescription, setBookDescription] = useState('')
  const [bookList, setBookList] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [bookImage, setBookImage] = useState(null)
  const [visibleElement, setVisibleElement] = useState(false)

  const [bookTitleSubmitted, setBookTitleSubmitted] = useState(false)

  const getBooksByTitleString = useSelector(
    (store) => store.getBooksByTitleString
  )
  const { response, loading, error } = getBooksByTitleString

  const dispatch = useDispatch()

  const onRegister = () => {
    if (selectedBook === null) {
      let flag = 0
      console.log(bookTitle)
      if (bookTitle === '' && flag === 0) {
        alert('please enter the book title')
        flag = 1
      }

      if (iSBN === '' && flag === 0) {
        alert('please enter the ISBN no')
        flag = 1
      }
      if (bookAuthor === '' && flag === 0) {
        alert('please enter the book author')
        flag = 1
      }
      if (bookDescription === '' && flag === 0) {
        alert('please enter the book description')
        flag = 1
      }

      if (bookCover === null && flag === 0) {
        alert('please select the book cover')
        flag = 1
      }

      if (flag === 0) {
        props.onRegister(
          bookTitle,
          iSBN,
          bookAuthor,
          bookDescription,
          bookCover
        )
        props.showPreviewFunc(true)
      }
    } else {
      props.onRegister(
        selectedBook.bookTitle,
        selectedBook.ISBN,
        selectedBook.bookAuthor,
        selectedBook.bookDescription,
        bookImage,
        selectedBook
      )
      props.showPreviewFunc(true)
    }
  }

  const onBookTitleChange = (value) => {
    props.showPreviewFunc(false)
    getBooks(value)
    setBookTitle(value)
    setSelectedBook(null)
    setVisibleElement(false)
  }

  const getBooks = (titleString) => {
    console.log('response is ')
    console.log(response)
    setBookTitleSubmitted(true)
    dispatch(getBookByTitleStringFunc(titleString))
  }

  const saveBookList = (values) => {
    setBookList(
      values.map((book) => {
        return book.book
      })
    )
  }

  const getSelectedBook = (value) => {
    setVisibleElement(true)
    setSelectedBook(
      bookList.find((book) => {
        return book.book_id === value
      })
    )

    if (response) {
      let selectedData = response.data.filter((book) => {
        if (book.book.book_id === value) {
          return true
        }
        return false
      })
      const byteCharacters = atob(selectedData[0].bookImage)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'image/*' })
      setBookImage(blob)
    }
  }
  useEffect(() => {
    if (response && response.status === 'success' && bookTitleSubmitted) {
      console.log(response.data)
      saveBookList(response.data)
      setBookTitleSubmitted(false)
    } else if (response && response.status === 'error' && bookTitleSubmitted) {
      setVisibleElement(true)
      setSelectedBook(null)
      setBookImage(null)
      setBookTitleSubmitted(false)
    } else if (error && bookTitleSubmitted) {
      alert(error)
      setBookTitleSubmitted(false)
    }
  }, [response, loading, error])

  return (
    <div className="col-md-8" style={{ padding: '20px' }}>
      <h3>Add Book</h3>
      <div style={{ marginTop: '10px' }} className="form-group">
        <label
          style={{ marginLeft: '10px', marginBottom: '5px' }}
          className="label1"
          htmlFor="bookTitle">
          Book Title
        </label>
        <input
          onChange={(e) => {
            onBookTitleChange(e.target.value)
          }}
          type="text"
          id="bookTitle"
          className="form-control"
          placeholder="enter the title of the book"
          value={selectedBook != null ? selectedBook.bookTitle : bookTitle}
          required
        />
      </div>
      {selectedBook === null &&
        bookList.length !== 0 &&
        response &&
        response.status === 'success' && (
          <BookList list={bookList} getSelectedBook={getSelectedBook} />
        )}
      {response && response.status === 'error' && (
        <div className="text-danger">{response.data}</div>
      )}
      {visibleElement && (
        <div>
          <div style={{ marginTop: '10px' }} className="form-group">
            <label
              style={{ marginLeft: '10px', marginBottom: '5px' }}
              className="label1"
              htmlFor="ISBN">
              ISBN
            </label>
            <input
              onChange={(e) => {
                props.showPreviewFunc(false)
                setISBN(e.target.value)
              }}
              type="text"
              id="ISBN"
              className="form-control"
              placeholder="enter the ISBN of the book"
              value={selectedBook != null ? selectedBook.ISBN : iSBN}
              required
            />
          </div>
          <div style={{ marginTop: '10px' }} className="form-group">
            <label
              style={{ marginLeft: '10px', marginBottom: '5px' }}
              className="label1"
              htmlFor="bookAuthor">
              Book Author
            </label>
            <input
              onChange={(e) => {
                props.showPreviewFunc(false)
                setBookAuthor(e.target.value)
              }}
              type="text"
              id="bookAuthor"
              className="form-control"
              placeholder="enter the author of the book"
              value={
                selectedBook != null ? selectedBook.bookAuthor : bookAuthor
              }
              required
            />
          </div>
          <div style={{ marginTop: '10px' }} className="form-group">
            <label
              style={{
                marginLeft: '10px',
                marginBottom: '5px',
              }}
              className="label1"
              htmlFor="bookDescription">
              Book Description
            </label>
            <textarea
              onChange={(e) => {
                props.showPreviewFunc(false)
                setBookDescription(e.target.value)
              }}
              style={{ height: '80px', resize: 'none' }}
              id="bookDescription"
              className="form-control"
              placeholder="enter the description of the book"
              value={
                selectedBook != null
                  ? selectedBook.bookDescription
                  : bookDescription
              }
              required
            />
          </div>
          {selectedBook === null ? (
            <div>
              <div style={{ marginTop: '10px' }} className="form-group">
                <label
                  style={{ marginLeft: '10px', marginBottom: '5px' }}
                  className="label1"
                  htmlFor="Image">
                  Book cover
                </label>
                <input
                  onChange={(e) => {
                    props.showPreviewFunc(false)
                    console.log(typeof e.target.files[0])
                    setBookCover(e.target.files[0])
                  }}
                  type="file"
                  id="Image"
                  className="form-control"
                />
              </div>
              {bookCover != null && (
                <img
                  style={{ marginTop: '10px' }}
                  width="100px"
                  height="100px"
                  src={URL.createObjectURL(bookCover)}
                />
              )}
            </div>
          ) : (
            <div>
              {bookImage != null && (
                <img
                  style={{ marginTop: '10px' }}
                  width="100px"
                  height="100px"
                  src={URL.createObjectURL(bookImage)}
                />
              )}
            </div>
          )}
          <div className="d-grid gap-2" style={{ marginTop: '20px' }}>
            <button
              onClick={onRegister}
              style={{ marginBottom: '10px' }}
              className="btn btn-success"
              type="button">
              Add Book
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookInputs
