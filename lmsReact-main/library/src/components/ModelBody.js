import { useState } from 'react'
import { useEffect } from 'react'

const ModelBody = (props) => {
  const [libraryName, setLibraryName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [addr, setAddr] = useState({})
  useEffect(() => {
    console.log('Model body is loaded')
    console.log(props.data)
    if (props.data) {
      setLibraryName(props.data.libraryName)
      setPhone(props.data.phone)
      setEmail(props.data.email)
      setAddr(props.data.addr)
    }
  })

  return (
    <div>
      {libraryName && <h3>{libraryName}</h3>}
      {phone && <div>phone : {phone}</div>}
      {email && <div>email : {email}</div>}
      {addr.buildingName && addr.colonyName && (
        <div>
          address : {addr.buildingName},{addr.colonyName},{addr.city},
          {addr.state},{addr.pincode}
        </div>
      )}
    </div>
  )
}

export default ModelBody
