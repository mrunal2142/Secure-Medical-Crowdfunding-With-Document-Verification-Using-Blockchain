import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminApplicationContext } from '../contexts/admin_context/AdminApplicationContext'
import { useEstimatedDataContext } from '../contexts/admin_context/EstimatedDataContext'
import '../styles/Home.css'
import { useAdminBlockChainContext } from '../contexts/blockchain_context/AdminBlockChainContext'
import { useWallectConnectContext } from '../contexts/blockchain_context/walletConnectContext'

const AdminApplications = () => {
  const {
    eligibility,
    setEligibility,
    showCheckAlert,
    checkAlert,
    application,
    setApplication,
    setIsVerfied,
    checkEligibility,
    file, setFile, 
    generateHash,uploadCertificate
  } = useAdminApplicationContext()
  const { estData } = useEstimatedDataContext()
  const { createApplicationTransaction } = useAdminBlockChainContext()
  const { address } = useWallectConnectContext()

  const navigate = useNavigate()
  const handleClick = async () => {
    const obj = {
      ...eligibility,
      ...application,
      askingValue: eligibility.askingValue.toString(), 
      patientTag: file.patientFileURL,
      aadharNo: parseInt(application.aadharNo),
      address: address,
    }
    await createApplicationTransaction(obj)
    navigate('/admin/dashboard')
    // console.log(obj)
  }

  return (
    <React.Fragment>
      <div className="border" id="main-div" style={{ height: '70vh' }}>
        <div
          id="main-admin-heading"
          className="text-center d-flex flex-column mt-4 mb-4"
        >
          <span className="fs-4">Applications</span>
          <span>
            Fund seeker eligibility & application process with human
            verification.
          </span>
        </div>

        {showCheckAlert && (
          <div className="m-3 position-absolute top-0 start-50 translate-middle-x">
            <div className={`alert alert-${checkAlert.severity}`} role="alert">
              {checkAlert.message}
            </div>
          </div>
        )}

        <div
          className="p-3 overflow-auto "
          id="admin-form-div"
          style={{ height: '85%' }}
        >
          <div id="admin-eligibility-div">
            <div
              id="eligibility-heading"
              className="d-flex gap-2 align-items-center"
            >
              <span
                className="flex-grow-1 border-bottom"
                style={{ height: '0.1rem' }}
              ></span>
              <span className="ms-2 me-2 fs-6 fw-semibold">
                Check Eligibility
              </span>
              <span
                className="flex-grow-1 border-bottom"
                style={{ height: '0.1rem' }}
              ></span>
            </div>

            <div className="division-form mt-4 mb-4">
              <div className="row ">
                <span className="input-group-text col-2">Disease</span>
                <select
                  className="form-select col"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setEligibility((prevUser) => ({
                      ...prevUser,
                      disease: e.target.value,
                    }))
                  }}
                >
                  <option value="">Choose an option</option>
                  {estData.map((entry, index) => (
                    <option key={index} value={entry.disease_name}>
                      {entry.disease_name}
                    </option>
                  ))}
                </select>
                <span className="input-group-text col-2 ms-2">
                  Asking Value
                </span>
                <input
                  type="text"
                  aria-label="First name"
                  className="form-control col"
                  placeholder="Asking value in $"
                  onChange={(e) => { 
                    setEligibility((prevUser) => ({
                      ...prevUser,
                      askingValue: e.target.value*0.0005,
                    }))
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary btn col-2"
                  onClick={checkEligibility}
                >
                  Check Eligibilty
                </button>
              </div>
            </div>
          </div>

          <div id="admin-application-div" className="m-0 disabled">
            <div
              id="application-heading"
              className="d-flex gap-2 align-items-center"
            >
              <span
                className="flex-grow-1 border-bottom"
                style={{ height: '0.1rem' }}
              ></span>
              <span className="ms-2 me-2 fs-6 fw-semibold">
                Fund Raising Application
              </span>
              <span
                className="flex-grow-1 border-bottom"
                style={{ height: '0.1rem' }}
              ></span>
            </div>

            <div className="mt-4 mb-4">
              <div className="mb-3">
                <label for="AadharNumber" className="form-label">
                  Aadhar Number
                </label>

                <input
                  required
                  type="text"
                  className="form-control flex-fill"
                  id="aadharNumber"
                  placeholder="Aadhar Number"
                  aria-label="aadharNumber"
                  onChange={(e) => {
                    setApplication((prev) => ({
                      ...prev,
                      aadharNo: e.target.value,
                    }))
                  }}
                />
              </div>

              <div className="mb-3">
                <label for="AadharNumber" className="form-label">
                  PAN Number
                </label>

                <input
                  required
                  type="text"
                  className="form-control flex-fill"
                  id="panNumber"
                  placeholder="PAN Number"
                  aria-label="panNumber"
                  onChange={(e) => {
                    setApplication((prev) => ({
                      ...prev,
                      panNo: e.target.value,
                    }))
                  }}
                />
              </div>

              <div className="mb-3">
                <label for="AadharNumber" className="form-label">
                  Patient's Name
                </label>

                <input
                  required
                  type="text"
                  className="form-control flex-fill"
                  id="patientName"
                  placeholder="Patient's Name"
                  aria-label="patientName"
                  onChange={(e) => {
                    setApplication((prev) => ({
                      ...prev,
                      patientName: e.target.value,
                    }))
                  }}
                />
              </div>

              <div className="mb-3 row">
                <label for="AadharNumber" className="form-label ">
                  Patient's Certificate
                </label>
                <input
                  type="file"
                  className="form-control col ms-2"
                  placeholder="Patient's Tag"
                  aria-label="patientTag"
                  aria-describedby="basic-addon1"
                  onChange={(event) => {
                    setFile((prev) => ({
                      ...prev,
                      patientFile: event.target.files[0]
                    }))
                  }}  
                />
                <button
                  type="button"
                  id="fileUpload"
                  className="btn btn-primary btn col-2 ms-2"
                  onClick={uploadCertificate}
                >
                  Upload file
                </button>
              </div>

              <div className="mb-3">
                <label for="AadharNumber" className="form-label">
                  Disease
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Disease"
                  aria-label="Disease"
                  aria-describedby="basic-addon1"
                  readOnly
                  value={eligibility.disease}
                />
              </div>

              <div className="mb-3">
                <label for="AadharNumber" className="form-label">
                  Asking Value
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Asking Value"
                  aria-label="askingValue"
                  aria-describedby="basic-addon1"
                  readOnly
                  value={eligibility.askingValue}
                />
              </div>

              <div className="mb-3">
                <label for="AadharNumber" className="form-label">
                  Fund Raiser Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Fund Raiser Name"
                  aria-label="fundRaiserName"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setApplication((prev) => ({
                      ...prev,
                      fundRaiserName: e.target.value,
                    }))
                  }}
                />
              </div>

              <div className="input-group mb-3">
              
                <input
                  type="text"
                  className="form-control"
                  placeholder="Hash Code"
                  aria-label="hashCode"
                  disabled
                  value={application.hashCode}
                  aria-describedby="basic-addon1"
                />
                <button
                  type="button"
                  id="generate-hash"
                  className="btn btn-primary btn "
                  onClick={generateHash}
                >
                  Generate Hash
                </button>
              </div>

              <div
                id="verify-check"
                className="input-group d-flex gap-2 disabled"
              >
                <input
                  className="form-check-input border"
                  type="checkbox"
                  onChange={(e) => {
                    setIsVerfied(e.target.value)
                  }}
                  aria-label="Checkbox for following text input"
                />

                <span>Verified by admin1@gmail.com</span>
              </div>

              <button
                type="button"
                id="upload-blockChain"
                className="btn btn-primary btn-sm mt-3 disabled"
                onClick={handleClick}
              >
                Upload Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminApplications
