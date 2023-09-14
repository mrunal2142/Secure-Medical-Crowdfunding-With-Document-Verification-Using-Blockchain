import React from 'react'
import { useEstimatedDataContext } from '../contexts/admin_context/EstimatedDataContext'

const AdminEstimations = () => {
  
  const { estData, dataLoaded } = useEstimatedDataContext()

  return (
    <>
      {dataLoaded && (
        <React.Fragment>
          <div className="container border overflow-auto" style={{maxHeight:'80vh'}}>
            <div
              id="estimation-heading"
              className="text-center d-flex flex-column mt-4 mb-4"
            >
              <span className="fs-4">Estimated Data</span>
              The provided dummy dataset is a simulated API offering projected
              information on disease treatment expenses in dollars.
            </div>

            <div id="est-data-table mt-5">
              <div className="row bg-light p-1 round text-center">
                <div className="col fs-6">Disease Name</div>
                <div className="col fs-6">Dollars</div>
                <div className="col fs-6">Ethereum</div>
                <div className="col fs-6">kwei</div>
                <div className="col fs-6">Mwei</div>
                <div className="col fs-6">Gwei</div>
              </div>
              {estData.map((disease, index) => (
                <div className="row  border-bottom p-1 text-center">
                  {Object.entries(disease).map(([key, value]) => (
                    <div className="col fs-6" key={key}>
                      {value}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  )
}

export default AdminEstimations
