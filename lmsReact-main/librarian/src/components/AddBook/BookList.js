import { useEffect } from 'react'
import { useState } from 'react'

const BookList = (props) => {
  const [list, setlist] = useState([])
  const onDivSelect = (event, id) => {
    console.log(id)
    props.getSelectedBook(id)
  }
  useEffect(() => {
    setlist(props.list)
  }, [props.list])
  return (
    <div className="BookListDiv">
      <div className="BookListScroll">
        {list.map((book) => {
          return (
            <div
              key={book.serialNo}
              className="divScroll"
              onClick={(event) => {
                onDivSelect(event, book.book_id)
              }}>
              {book.bookTitle}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookList
