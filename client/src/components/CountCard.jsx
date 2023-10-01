import React from 'react'

const CountCard = ({ title, data }) => {
  return (
    <React.Fragment>
      <div
        className="d-flex flex-column border rounded shadow-sm justify-content-center align-items-center mt-2"
        style={{ width: '150px' }}
      >
        <span className="fs-1">{data}</span>
        <span className="border bg-body-secondary w-100 text-center">
          {title}
        </span>
      </div>
    </React.Fragment>
  )
}

export default CountCard
