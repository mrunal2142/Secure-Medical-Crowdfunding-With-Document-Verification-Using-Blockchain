import React from 'react'

const CampaignCard = () => {
  return (
    <React.Fragment>
      <div className="card p-2" style={{ width: '18rem' }}>
      {/* <img src="https://i.pinimg.com/564x/a4/38/40/a43840f2e37becf1402220c48523b5d4.jpg" class="card-img-top" alt="..." /> */}
        <div className="card-body d-flex gap-2">
          <span
            className="bg-primary bg-gradient"
            style={{ width: '50px' }}
          ></span>
          <div>
            <h5 className="card-title fs-5">Card title</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Deadline - 12.04.2023
            </h6>
            <p
              className="card-text  "
              style={{
                lineHeight: '1.2em',
                height: '3.6em',
                overflow: 'hidden',
              }}
            >
              Some quick example text to build on the card title and make up the
              bul is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).k of the card's content.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CampaignCard
