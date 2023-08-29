import React from 'react'
import { Link } from 'react-router-dom'

const DivisionCards = ({
  cardInd,
  cardHeader,
  cardTitle,
  cardDes,
  link,
  cardFooter,
}) => {
  return (
    <React.Fragment>
      <div class="card text-center" key={cardInd}>
        <div class="card-header">{cardHeader}</div>
        <div class="card-body">
          <p class="card-title fs-5">{cardTitle}</p>
          <p
            class="card-text fs-6 "
            style={{ maxWidth: '20vw', height: '8vh' }}
          >
            {cardDes}
          </p>
          <Link to={link} className="btn btn-primary btn-sm">
            {cardTitle}
          </Link>
        </div>
        <div class="card-footer text-body-secondary">{cardFooter}</div>
      </div>
    </React.Fragment>
  )
}

export default DivisionCards
