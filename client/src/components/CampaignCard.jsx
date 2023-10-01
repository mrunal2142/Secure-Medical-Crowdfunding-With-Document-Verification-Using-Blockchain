import React from 'react'

const CampaignCard = ({temp, title, deadline, description, handleClick}) => {
  return (
    <React.Fragment>
      <div key={temp} className="card p-2 hoverClass" style={{ width: '18rem' }} onClick={handleClick}>
        <div className="card-body d-flex gap-2">
          <span
            className="bg-primary bg-gradient"
            style={{ width: '50px' }}
          ></span>
          <div>
            <h5 className="card-title fs-5">{title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Deadline - {deadline}
            </h6>
            <p
              className="card-text  "
              style={{
                lineHeight: '1.2em',
                height: '3.6em',
                overflow: 'hidden',
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CampaignCard
