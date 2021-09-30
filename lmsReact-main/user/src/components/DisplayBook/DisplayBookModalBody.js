const DisplayBookModalBody = (props) => {
  return (
    <div className="row">
      <div className="col-md-4">
        {props.lbd && (
          <img
            width="200px"
            height="200px"
            src={URL.createObjectURL(props.lbd.bookImage)}
          />
        )}
      </div>
      <div className="col-md-6">
        {props.lbd && (
          <div
            style={{ marginTop: '5px', fontSize: '16px', fontWeight: 'bold' }}>
            {props.lbd.lbd.book.bookTitle}
          </div>
        )}
        {props.lbd && (
          <div style={{ marginTop: '5px', fontSize: '14px' }}>
            {props.lbd.lbd.book.bookAuthor}
          </div>
        )}

        {props.lbd && (
          <div style={{ marginTop: '5px', fontSize: '14px' }}>
            {props.lbd.lbd.book.bookDescription}
          </div>
        )}
        {props.lbd && (
          <div style={{ marginTop: '5px', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold' }}>ISBN :: </span>{' '}
            <span>{props.lbd.lbd.book.ISBN}</span>
          </div>
        )}
        {props.lbd && (
          <div style={{ marginTop: '5px', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold' }}>Total Books :: </span>{' '}
            <span>{props.lbd.lbd.totNoOfBooks}</span>
          </div>
        )}
        {props.lbd && (
          <div style={{ marginTop: '5px', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold' }}>Available Books :: </span>{' '}
            {props.lbd.lbd.availableBooks ? (
              <span>{props.lbd.lbd.availableBooks}</span>
            ) : (
              <span>0</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DisplayBookModalBody
