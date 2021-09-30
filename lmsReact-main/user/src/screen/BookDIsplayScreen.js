import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getBookByLibraryFunc } from '../action/BookAction'
import BookDisplayHeader from '../components/DisplayBook/DisplayBookHeader'
import DisplayBookModal from '../components/DisplayBook/DisplayBookModal'
import '../css/displayBooks.css'

const BookDisplayScreen = (props) => {
  const [counter, setCounter] = useState(true)
  const [data, setData] = useState([])
  const [mainArray, setMainArray] = useState([])
  const [infoSubmitted, setInfoSubmitted] = useState(false)

  const getBooksByLibrary = useSelector((store) => store.getBooksByLibrary)
  const { response, loading, error } = getBooksByLibrary

  const dispatch = useDispatch()
  const showSelecteContent = (value, type) => {
    console.log('type is ' + type + ' and value is ' + value)
    if (value === null) {
      setData(mainArray)
    }
    if (type === 'title') {
      setData(
        mainArray.filter((lbd) => {
          if (
            lbd.lbd.book.bookTitle.toLowerCase().includes(value.toLowerCase())
          ) {
            return true
          }
          return false
        })
      )
    } else if (type === 'author') {
      setData(
        mainArray.filter((lbd) => {
          if (
            lbd.lbd.book.bookAuthor.toLowerCase().includes(value.toLowerCase())
          ) {
            return true
          }
          return false
        })
      )
    } else {
      setData(
        mainArray.filter((lbd) => {
          if (lbd.lbd.book.ISBN.toLowerCase().includes(value.toLowerCase())) {
            return true
          }
          return false
        })
      )
    }
  }

  const onLoad = () => {
    setInfoSubmitted(true)
    dispatch(getBookByLibraryFunc())
  }

  const saveData = (values) => {
    let i = 0
    setData(
      values.map((lbd) => {
        i++
        const byteCharacters = atob(lbd.bookImage)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: 'image/*' })
        return {
          index: i,
          lbd: lbd.lbd,
          bookImage: blob,
        }
      })
    )
    setMainArray(
      values.map((lbd) => {
        i++
        const byteCharacters = atob(lbd.bookImage)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: 'image/*' })
        return {
          index: i,
          lbd: lbd.lbd,
          bookImage: blob,
        }
      })
    )
  }
  useEffect(() => {
    if (counter) {
      onLoad()
      setCounter(false)
    }

    if (response && response.status === 'success' && infoSubmitted) {
      console.log(response.data)
      saveData(response.data)
      setInfoSubmitted(false)
    } else if (response && response.status === 'error' && infoSubmitted) {
      alert(response.data)
      setInfoSubmitted(false)
    } else if (error && infoSubmitted) {
      alert(error)
      setInfoSubmitted(false)
    }
  }, [response, loading, error])
  return (
    <div>
      <BookDisplayHeader showSelecteContent={showSelecteContent} />
      <div>
        <div className="DisplayBooksClass">
          {data.length !== 0 &&
            data.map((lbd) => {
              return (
                <li key={lbd.index}>
                  <DisplayBookModal lbd={lbd} />
                </li>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default BookDisplayScreen
