import React from 'react'

const Loader = ({title, message}) => {
  return (
    <div
      className="z-3 mt-3 border bg-light  position-absolute w-100 d-flex flex-column justify-content-center align-items-center m-auto "
      style={{ height: '90vh' }}
    >
      <div>
        <span className=" fs-4">{title}</span>{' '}
        <div class="spinner-border spinner-border-sm ms-2" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Loader
