import React from 'react'
import emptyBox from '../data/empty02.png'

const EmptyCard = ({msg}) => {
  return (
    <React.Fragment>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <img src={emptyBox} style={{ width: '100px' }} />
        <p className="fs-6">{msg}</p>
      </div>
    </React.Fragment>
  )
}

export default EmptyCard
