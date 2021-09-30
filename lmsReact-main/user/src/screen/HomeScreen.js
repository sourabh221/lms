import { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getBookByLibraryFunc } from '../action/BookAction'
import '../css/home.css'

const HomeScreen = (props) => {
  const [counter, setCounter] = useState(true)
  const [data, setData] = useState([])
  const [infoSubmitted, setInfoSubmitted] = useState(false)
  const [libraryTitle, setLibraryTitle] = useState('')

  const getBooksByLibrary = useSelector((store) => store.getBooksByLibrary)
  const { response, loading, error } = getBooksByLibrary

  const dispatch = useDispatch()

  const onLoad = () => {
    setInfoSubmitted(true)
    dispatch(getBookByLibraryFunc())
  }

  const saveData = (values) => {
    let i = 0
    if (values[0]) {
      setLibraryTitle(values[0].lbd.library.libraryName)
    }
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
      {libraryTitle !== '' && (
        <marquee
          direction="right"
          style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {libraryTitle}
        </marquee>
      )}
      <div>
        {data.length !== 0 && (
          <div className="homeDiv">
            <Carousel>
              {data.map((lbd) => {
                return (
                  <Carousel.Item interval={2000} key={lbd.index}>
                    <img
                      width="90pc"
                      height="550px"
                      className="d-block w-100"
                      src={URL.createObjectURL(lbd.bookImage)}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>{lbd.lbd.book.bookTitle}</h3>
                      <div>
                        <div>Author :: {lbd.lbd.book.bookAuthor}</div>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </div>
        )}
        {data.length === 0 && (
          <div className="text-danger">products are not available</div>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
