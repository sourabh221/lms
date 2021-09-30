import { useState } from 'react'
import ReturnBookHeader from '../components/ReturnBook/ReturnBookHeader'
import ReturnBookHistoryList from '../components/ReturnBook/ReturnBookHistoryList/ReturnBookHistoryList'
import ReturnBookList from '../components/ReturnBook/ReturnBookList/ReturnBookList'

const ReturnBookScreen = (props) => {
  const [optionString, setOptionString] = useState('returnBookList')
  const showContent = (value) => {
    console.log(value)
    setOptionString(value)
  }
  return (
    <div>
      <ReturnBookHeader showContent={showContent} />
      {optionString === 'returnBookList' && <ReturnBookList />}
      {optionString === 'returnBookHistory' && <ReturnBookHistoryList />}
    </div>
  )
}

export default ReturnBookScreen
