import { useEffect } from 'react'

const InfoModalBody = (props) => {
  useEffect(() => {
    console.log(props.data)
  })
  return (
    <div className="row">
      <div className="col-md-4">
        {props.data && (
          <img
            width="200px"
            height="200px"
            src={URL.createObjectURL(props.data)}
          />
        )}
      </div>
      <div className="col-md-8">
        {props.userInfo.firstName && props.userInfo.lastName && (
          <div style={{ marginTop: '5px', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold' }}>Name :: </span>{' '}
            <span>
              {props.userInfo.firstName} {props.userInfo.lastName}
            </span>
          </div>
        )}
        {props.userInfo.phone && (
          <div style={{ marginTop: '5px', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold' }}>Phone :: </span>{' '}
            <span>{props.userInfo.phone}</span>
          </div>
        )}
        {props.userInfo.email && (
          <div style={{ marginTop: '5px', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold' }}>Email :: </span>{' '}
            <span>{props.userInfo.email}</span>
          </div>
        )}
        {props.userInfo.addr.buildingName && props.userInfo.addr.colonyName && (
          <div style={{ marginTop: '5px', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold' }}>Addresss :: </span>{' '}
            <span>
              {' '}
              {props.userInfo.addr.buildingName},
              {props.userInfo.addr.colonyName},{props.userInfo.addr.city},
              {props.userInfo.addr.state},{props.userInfo.addr.pincode}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfoModalBody
