import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addBookFunc, bookCoverUploadFunc } from '../action/BookAction'
import BookInputs from '../components/AddBook/BookInputs'
import '../css/addBook.css'

const AddBookScreen = (props) => {
  const [bookTitle, setBookTitle] = useState('')
  const [bookCover, setBookCover] = useState(null)
  const [iSBN, setISBN] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookDescription, setBookDescription] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [bookId, setBookId] = useState(null)

  const [bookInfoSubmitted, setBookInfoSubmitted] = useState(false)
  const [bookCoverSubmitted, setBookCoverSubmitted] = useState(false)

  const bookAdd = useSelector((store) => store.bookAdd)
  const { response, loading, error } = bookAdd

  const bookCoverUpload = useSelector((store) => store.bookCoverUpload)
  const {
    loading: loading1,
    error: error1,
    response: response1,
  } = bookCoverUpload

  const dispatch = useDispatch()

  const showPreviewFunc = (value) => {
    console.log(value)
    setShowPreview(value)
  }
  const onRegister = (
    bookTitle,
    iSBN,
    bookAuthor,
    bookDescription,
    bookCover,
    selectedBook
  ) => {
    console.log('book title is ')
    console.log(bookTitle)
    setBookTitle(bookTitle)
    setISBN(iSBN)
    setBookAuthor(bookAuthor)
    setBookDescription(bookDescription)
    setBookCover(bookCover)
    if (selectedBook) {
      console.log(selectedBook.serialNo)
      setBookId(selectedBook.serialNo)
    } else {
      setBookId(null)
    }
  }

  const onFinalRegister = () => {
    setBookInfoSubmitted(true)
    dispatch(addBookFunc(bookTitle, iSBN, bookAuthor, bookDescription, bookId))
  }

  const bookCoverUploadMethod = (serialNo) => {
    setBookCoverSubmitted(true)
    dispatch(bookCoverUploadFunc(bookCover, serialNo))
  }

  useEffect(() => {
    if (response && response.status === 'success' && bookInfoSubmitted) {
      console.log(response.data)
      setBookInfoSubmitted(false)
      if (bookId === null) {
        bookCoverUploadMethod(response.data.book.serialNo)
      } else {
        alert(response.data)
      }
    } else if (response && response.status === 'error' && bookInfoSubmitted) {
      alert(response.data)
      setBookInfoSubmitted(false)
    } else if (error && bookInfoSubmitted) {
      alert(error)
      setBookInfoSubmitted(false)
    }

    if (response1 && response1.status === 'success' && bookCoverSubmitted) {
      alert('book added successfully')
      setBookCoverSubmitted(false)
    } else if (
      response1 &&
      response1.status === 'error' &&
      bookCoverSubmitted
    ) {
      alert(response1.data)
      setBookCoverSubmitted(false)
    } else if (error1 && bookCoverSubmitted) {
      alert(error1)
      setBookCoverSubmitted(false)
    }
  }, [response, loading, error, response1, loading1, error1])
  return (
    <div className="container">
      <div className="row">
        <BookInputs onRegister={onRegister} showPreviewFunc={showPreviewFunc} />
        <div className="col-md-4">
          {showPreview && (
            <div className="showPreview">
              {bookCover !== null && (
                <img
                  width="250px"
                  height="200px"
                  src={URL.createObjectURL(bookCover)}
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
                  width: '230px',
                  height: '80px',
                  overflow: 'hidden',
                  lineBreak: 'anywhere',
                }}>
                {bookDescription}
              </div>
              <button
                onClick={onFinalRegister}
                style={{
                  marginLeft: '95px',
                  marginTop: '14px',
                }}
                className="btn  btn-outline-success">
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddBookScreen
