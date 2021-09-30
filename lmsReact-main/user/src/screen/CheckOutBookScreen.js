import { useEffect, useState } from 'react'
import CheckOutHeader from '../components/CheckOutBook/CheckOutHeader'
import CheckOutHistory from '../components/CheckOutBook/CheckOutHistory/CheckOutHistory'
import CheckOutBookList from '../components/CheckOutBook/CheckOuts/CheckOutBookList'

const CheckOutBookScreen = (props) => {
  const [optionString, setOptionString] = useState('checkOutList')
  const showContent = (value) => {
    console.log(value)
    setOptionString(value)
  }
  useEffect(() => {}, [optionString])
  return (
    <div>
      <div>
        <CheckOutHeader showContent={showContent} />
      </div>
      {optionString === 'checkOutList' && <CheckOutBookList />}
      {optionString === 'checkOutHistory' && <CheckOutHistory />}
    </div>
  )
}

export default CheckOutBookScreen
