import React, { useState } from 'react'
import { FormField } from './ComponentsIndex'
import { useCampaignBlockchainContext } from '../contexts/blockchain_context/CampaignBlockchainContext'

const CampaignCreate = () => {
  const {
    alert,
    showApplicationData,
    applicationData,
    setApplicationData,
    checkHashEligibility,
  } = useCampaignBlockchainContext()

  const [campaignForm, setCampaignForm] = useState({
    aadharNumber: '',
    hashCode: '',
    campaignTitle: '',
    campaignDescription: '',
    campaignDeadline: '',
  })

  const handleFormFieldChange = (fieldName, e) => {
    //takes a key press event 'e'
    setCampaignForm((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }))
  }

  const checkEligibility = async () => {
    await checkHashEligibility(campaignForm)
  }

  return (
    <React.Fragment>
      <div
        id="campaign-create-main div"
        className="container p-2 border overflow-auto mt-2"
        style={{ height: '85vh' }}
      >
        <div
          id="campaign-create-heading"
          className="text-center d-flex flex-column mt-4 mb-4"
        >
          <span className="fs-4">Create Campaign</span>
          Please ensure the accuracy of your uploaded details as we will be
          conducting a verification process. Thank you for your cooperation.
        </div>

        <form className="p-4">
          <div id="med-application">
            <div
              id="med-application-heading"
              className="d-flex gap-2 align-items-center mb-4"
            >
              <span
                className="flex-grow-1 border-bottom"
                style={{ height: '0.1rem' }}
              ></span>
              <span className="ms-2 me-2 fs-6 fw-semibold">
                Admin Information
              </span>
              <span
                className="flex-grow-1 border-bottom"
                style={{ height: '0.1rem' }}
              ></span>
            </div>

            <div className="row" id="aadhar-pan-info">
              <div className="col-lg-6">
                <FormField
                  labelFor="aadharNumber"
                  labelTitle="Aadhar Number"
                  isTextArea={false}
                  type="text"
                  id="aadharNumber"
                  placeHolder="12 digit Aadhar Number"
                  value={campaignForm.aadharNumber}
                  handleChange={(e) => handleFormFieldChange('aadharNumber', e)}
                  extra="Confidential Data*"
                />
              </div>
              <div className="col-lg-6">
                <FormField
                  labelFor="hashCode"
                  labelTitle="Hash Code"
                  isTextArea={false}
                  type="text"
                  id="hashCode"
                  placeHolder="Hash Code"
                  value={campaignForm.hashCode}
                  handleChange={(e) => handleFormFieldChange('hashCode', e)}
                  extra="Confidential Data*"
                />
              </div>
            </div>

            {/* <div className="row" id="Disease-askingValue-info">
                <div className="col-lg-6">
                  <FormField
                    labelFor="diseaseName"
                    labelTitle="Disease Name"
                    isTextArea={false}
                    type="text"
                    id="diseaseName"
                    placeHolder=""
                    value={campaignForm.diseaseName}
                    handleChange={(e) =>
                      handleFormFieldChange('diseaseName', e)
                    }
                  />
                </div>

                <div className="col-lg-6">
                  <FormField
                    labelFor="askingValue"
                    labelTitle="Asking Value"
                    isTextArea={false}
                    type="text"
                    id="askingValue"
                    placeHolder="Asking value in ETH*"
                    value={campaignForm.askingValue}
                    handleChange={(e) =>
                      handleFormFieldChange('askingValue', e)
                    }
                  />
                </div>
              </div> */}

            {/* <div className="row" id="Disease-askingValue-info">
                <div className="col-lg-6">
                  <FormField
                    labelFor="patientTag"
                    labelTitle="Patient Tag"
                    isTextArea={false}
                    type="text"
                    id="patientTag"
                    placeHolder="patient Tag "
                    value={campaignForm.patientTag}
                    handleChange={(e) => handleFormFieldChange('patientTag', e)}
                    extra="Medical Confidential Data *"
                  />
                </div>

                <div className="col-lg-6">
                  <FormField
                    labelFor="patientName"
                    labelTitle="Patient Name"
                    isTextArea={false}
                    type="text"
                    id="patientName"
                    placeHolder="Registered patient's name"
                    value={campaignForm.patientName}
                    handleChange={(e) =>
                      handleFormFieldChange('patientName', e)
                    }
                  />
                </div>
              </div> */}

            {/* <FormField
                labelFor="funderName"
                labelTitle="Funder's Name"
                isTextArea={false}
                type="text"
                id="funderName"
                placeHolder="Please enter your name"
                value={campaignForm.name}
                handleChange={(e) => handleFormFieldChange('name', e)}
              /> */}

            <div className="row">
              <div className="col-lg-6 p-2">
                <button
                  className="btn btn-primary col-lg-12 "
                  type="button"
                  onClick={checkEligibility}
                >
                  Verify Eligibility ( Admin )
                </button>
              </div>

              {alert.flag && (
                <div className="col">
                  <div class={`alert alert-${alert.alertType}`} role="alert">
                    {alert.alertMessage}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div id="crowd-funding" className="disabled">
            <div
              id="med-application-heading"
              className="d-flex gap-2 align-items-center mt-5 mb-4 "
            >
              <span
                className="flex-grow-1 border-bottom"
                style={{ height: '0.1rem' }}
              ></span>
              <span className="ms-2 me-2 fs-6 fw-semibold">
                Campaign Information
              </span>
              <span
                className="flex-grow-1 border-bottom"
                style={{ height: '0.1rem' }}
              ></span>
            </div>

            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">Verification Complete!</h4>
              <p>
                Congratulations, you have successfully completed the
                verification process. Admin details are mentioned below.
              </p>
              <hr />

              <>
                {showApplicationData &&
                  Object.entries(applicationData).map(([key, value]) => (
                    <>
                      <span className="d-flex gap-2">
                        <strong>{key}:</strong> {value}
                      </span>
                    </>
                  ))}
              </>
            </div>

            <FormField
              labelFor="campaignTitle"
              labelTitle="Campaign Title"
              isTextArea={false}
              type="text"
              id="campaignTitle"
              placeHolder="Campaign Title ( Descriptive )"
              value={campaignForm.campaignTitle}
              handleChange={(e) => handleFormFieldChange('campaignTitle', e)}
            />

            <FormField
              labelFor="campaignDescription"
              labelTitle="Campaign Description"
              isTextArea={true}
              type="text"
              id="campaignDescription"
              value={campaignForm.campaignDescription}
              handleChange={(e) =>
                handleFormFieldChange('campaignDescription', e)
              }
              extra="Please dont mention any personal information ( like - Aadhar Number, Bank accounts )"
            />

            <FormField
              labelFor="deadline"
              labelTitle="Deadline"
              isTextArea={false}
              type="date"
              id="campaignImage"

              // value={campaignForm.campaignImage}
              // handleChange={(e) => handleFormFieldChange('campaignImage', e)}
            />

            <button className="btn btn-primary col-lg-6 mb-3" type="submit">
              Upload Campaign
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default CampaignCreate
