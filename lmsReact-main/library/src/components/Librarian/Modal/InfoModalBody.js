import { useEffect } from 'react'

const InfoModalBody = (props) => {
  useEffect(() => {
    console.log(props.data)

    //<img width="20px" height="20px" src={URL.createObjectURL(props.data)} />
  })
  return (
    <div>
      {props.data && (
        <img
          width="100px"
          height="100px"
          src={URL.createObjectURL(props.data)}
        />
      )}
      {props.userInfo.firstName && props.userInfo.lastName && (
        <div>
          name : {props.userInfo.firstName} {props.userInfo.lastName}
        </div>
      )}
      {props.userInfo.phone && <div>phone : {props.userInfo.phone}</div>}
      {props.userInfo.email && <div>email : {props.userInfo.email}</div>}
      {props.userInfo.addr.buildingName && props.userInfo.addr.colonyName && (
        <div>
          address : {props.userInfo.addr.buildingName},
          {props.userInfo.addr.colonyName},{props.userInfo.addr.city},
          {props.userInfo.addr.state},{props.userInfo.addr.pincode}
        </div>
      )}
    </div>
  )
}

export default InfoModalBody
