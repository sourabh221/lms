import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBookByTitleStringFunc } from '../../../action/BookAction'
import { addReservationFunc } from '../../../action/ReservationAction'
import BookList from './BookList'

const MakeReservation = (props) => {
  const [bookTitle, setBookTitle] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)
  const [bookList, setBookList] = useState([])
  const [bookImage, setBookImage] = useState(null)
  const [visibleElement, setVisibleElement] = useState(false)
  const [period, setPeriod] = useState(0)
  const [iSBN, setISBN] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookDescription, setBookDescription] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const [bookTitleSubmitted, setBookTitleSubmitted] = useState(false)
  const [reservationMade, setReservationMade] = useState(false)
  const [counter, setCounter] = useState(true)
  const [serialNo, setSerialNo] = useState('')

  const getBooksByTitleString = useSelector(
    (store) => store.getBooksByTitleString
  )
  const { response, loading, error } = getBooksByTitleString

  const userReservationAdd = useSelector((store) => store.userReservationAdd)
  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = userReservationAdd

  const dispatch = useDispatch()

  const onBookTitleChange = (value) => {
    setShowPreview(false)
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
      setBookTitle(selectedData[0].book.bookTitle)
      setISBN(selectedData[0].book.ISBN)
      setBookAuthor(selectedData[0].book.bookAuthor)
      setBookDescription(selectedData[0].book.bookDescription)
      setSerialNo(selectedData[0].book.serialNo)
      setShowPreview(true)
    }
  }

  const onLoad = () => {
    if (props && props.lbd) {
      setSelectedBook(props.lbd.lbd.book)
      setBookImage(props.lbd.bookImage)
      setBookTitle(props.lbd.lbd.book.bookTitle)
      setISBN(props.lbd.lbd.book.ISBN)
      setBookAuthor(props.lbd.lbd.book.bookAuthor)
      setBookDescription(props.lbd.lbd.book.bookDescription)
      setSerialNo(props.lbd.lbd.book.serialNo)
      setShowPreview(true)
      setVisibleElement(true)
    }
  }

  const onRegister = () => {
    let flag = 0
    if (selectedBook === null) {
      alert('please select the book')
      flag = 1
    }
    if (period === null || (period === 0 && flag === 0)) {
      alert('please enter the period ')
      flag = 1
    }
    if (flag === 0) {
      if (
        window.confirm(
          'are u sure u want to do registeration for ' + selectedBook.bookTitle
        )
      ) {
        setReservationMade(true)
        dispatch(addReservationFunc(serialNo, period))
      }
    }
  }

  useEffect(() => {
    if (counter) {
      onLoad()
      setCounter(false)
    }

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

    if (response1 && response1.status === 'success' && reservationMade) {
      console.log(response1.data)
      setReservationMade(false)
      alert('reservation has been made')
    } else if (response1 && response1.status === 'error' && reservationMade) {
      console.log(response1)
      setReservationMade(false)
      alert(response1.data)
    } else if (error1 && reservationMade) {
      setReservationMade(false)
      alert(error1)
    }
  }, [response, loading, error, response1, loading1, error1])

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <div className="row">
        <div className="col-md-8">
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
            <div className="text-danger">
              no book available please search the correct one
            </div>
          )}
          {visibleElement && (
            <div>
              <div style={{ marginTop: '10px' }} className="form-group">
                <label
                  style={{ marginLeft: '10px', marginBottom: '5px' }}
                  className="label1"
                  htmlFor="period">
                  Period
                </label>
                <input
                  onChange={(e) => {
                    setPeriod(e.target.value)
                  }}
                  type="number"
                  id="period"
                  className="form-control"
                  placeholder="enter the period for which book needed"
                  required
                />
              </div>

              <div className="d-grid gap-2" style={{ marginTop: '20px' }}>
                <button
                  onClick={onRegister}
                  style={{ marginBottom: '10px' }}
                  className="btn btn-success"
                  type="button">
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-4">
          {showPreview && (
            <div className="showPreview">
              {bookImage !== null && (
                <img
                  width="300px"
                  height="200px"
                  src={URL.createObjectURL(bookImage)}
                />
              )}

              <div
                style={{
                  fontSize: '18px',
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {bookTitle}
              </div>
              <div
                style={{
                  marginLeft: '10px',
                  marginTop: '7px',
                  fontSize: '14px',
                  color: 'black',
                }}>
                {bookAuthor}
              </div>
              <div
                style={{
                  marginLeft: '10px',
                  marginTop: '7px',
                  fontSize: '14px',
                  color: 'black',
                }}>
                {iSBN}
              </div>
              <div
                style={{
                  marginLeft: '10px',
                  marginTop: '7px',
                  fontSize: '14px',
                  color: 'black',
                  width: '280px',
                  height: '120px',
                  overflow: 'hidden',
                  lineBreak: 'anywhere',
                }}>
                {bookDescription}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MakeReservation
