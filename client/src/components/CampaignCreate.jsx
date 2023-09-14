import React, { useState } from 'react'
import { FormField } from './ComponentsIndex'

const CampaignCreate = () => {
  const [campaignForm, setCampaignForm] = useState({
    aadharNumber: '',
    panNumber: '',
    diseaseName: '',
    askingValue: '',
    patientName: '',
    patientTag: '',
    name: '',

    campaignTitle: '',
    campaignDescription: '',
    campaignDeadline: '',
    campaignImage: '',
  })

  const handleFormFieldChange = (fieldName, e) => {
    //takes a key press event 'e'
    setCampaignForm((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }))
  }

  return (
    <React.Fragment>
      <div
        id="campaign-create-main div"
        className="container p-2 border overflow-auto mt-2"
        style={{ height: '85vh' }}
      >
        <div>
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
                  Medical & Personal Information
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
                    placeHolder="14 digit Aadhar Number"
                    value={campaignForm.aadharNumber}
                    handleChange={(e) =>
                      handleFormFieldChange('aadharNumber', e)
                    }
                    extra="Confidential Data*"
                  />
                </div>
                <div className="col-lg-6">
                  <FormField
                    labelFor="panNumber"
                    labelTitle="PAN Number"
                    isTextArea={false}
                    type="text"
                    id="panNumber"
                    placeHolder="PAN ID"
                    value={campaignForm.panNumber}
                    handleChange={(e) => handleFormFieldChange('panNumber', e)}
                    extra="Confidential Data*"
                  />
                </div>
              </div>

              <div className="row" id="Disease-askingValue-info">
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
              </div>

              <div className="row" id="Disease-askingValue-info">
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
              </div>

              <FormField
                labelFor="funderName"
                labelTitle="Funder's Name"
                isTextArea={false}
                type="text"
                id="funderName"
                placeHolder="Please enter your name"
                value={campaignForm.name}
                handleChange={(e) => handleFormFieldChange('name', e)}
              />

              <button className="btn btn-primary col-lg-3 mb-3" type="button">
                Verify Eligibility ( Admin )
              </button>

              <div class="alert alert-success" role="alert">
                A simple success alert—check it out!
              </div>
            </div>

            <div id="crowd-funding">
              <div
                id="med-application-heading"
                className="d-flex gap-2 align-items-center mt-5 mb-4"
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
                  verification process. You are now eligible to upload your
                  campaigns.
                </p>
                <hr />
                <p className="mb-0">
                  Please continue with your application. 
                </p>
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
                labelFor="campaignImage"
                labelTitle="Campaign Image"
                isTextArea={false}
                type="text"
                id="campaignImage"
                placeHolder="Enter image URL for your campaign"
                value={campaignForm.campaignImage}
                handleChange={(e) => handleFormFieldChange('campaignImage', e)}
              />
            </div>

            <button className="btn btn-primary col-lg-3 mb-3" type="submit" >
              Upload Campaign
            </button>
            
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CampaignCreate
