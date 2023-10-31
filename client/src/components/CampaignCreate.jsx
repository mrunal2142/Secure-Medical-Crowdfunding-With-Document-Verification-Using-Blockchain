import React, { useState } from 'react'
import { FormField } from './ComponentsIndex'
import { useCampaignBlockchainContext } from '../contexts/blockchain_context/CampaignBlockchainContext'
import { ethers } from 'ethers'
import { useWallectConnectContext } from '../contexts/blockchain_context/walletConnectContext'
import { useContract, useContractWrite } from '@thirdweb-dev/react'
import { useNavigate } from 'react-router-dom'

const CampaignCreate = () => {
  const {
    alert,
    showApplicationData,
    applicationData,
    checkHashEligibility,
    // for contract
    setShowLoader,
  } = useCampaignBlockchainContext()

  const { address } = useWallectConnectContext()

  const [campaignForm, setCampaignForm] = useState({
    aadharNumber: '',
    hashCode: '',
    campaignTitle: '',
    campaignDescription: '',
    campaignDeadline: '',
  })

  const handleFormFieldChange = (fieldName, e) => {
    setCampaignForm((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }))
  }

  const checkEligibility = async () => {
    await checkHashEligibility(campaignForm)
  }

  /* CAMPAIGN APPLICATION CONTRACT */
  // const { contract } = useContract('0xb13F0A53508d35413cD5c8e3298ffb31E4B33460')
  // const { contract } = useContract('0xDC24942a711c2d562a9c61514D50a50D105536FC')
  const { contract } = useContract('0x834ea542005817B1b41c248f05fED960165C0b87')
  
  const { mutateAsync: createCampaigns, isLoading } = useContractWrite(
    contract,
    'createCampaigns',
  )
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()

    //set show loader is from campaign blockchain context
    try {
      setShowLoader({
        loaderTitle: 'Transaction in process',
        loaderMessage:
          'Your transaction is in the queue. Please be patient while miners confirm it',
        loaderFlag: true,
      })

      const data = await createCampaigns({
        args: [
          parseInt(campaignForm.aadharNumber),
          campaignForm.hashCode,
          ethers.utils.parseUnits(applicationData.amount, 18),
          address,
          campaignForm.campaignTitle,
          campaignForm.campaignDescription,
          new Date(campaignForm.campaignDeadline).getTime(),
        ],
      })

      console.info('contract call successs', data)
      setShowLoader({
        loaderFlag: true,
        loaderTitle: 'Transaction confirmed ! ',
        loaderMessage:
          'Transaction successful. Please be patient for a moment.',
      })

    } catch (e) {
      console.info('----- createCampaignsTransaction error ----- ' + e)
      setShowLoader({
        loaderFlag: true,
        loaderTitle: 'Transaction Failed ! ',
        loaderMessage:
          'Oops! Something went wrong with your transaction. [Possible reasons: Application already exist, Transaction Problem, Architecture Problems] \n ' 
      })
    }
    setTimeout(() => {
      setShowLoader({
        loaderFlag: false,
      })
      navigate('/crowdFunding/CampaignMyCatalog')
    }, 3000)
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

        <form className="p-4" onSubmit={handleSubmit}>
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
              id="campaignDeadline"
              value={campaignForm.campaignDeadline}
              handleChange={(e) => handleFormFieldChange('campaignDeadline', e)}
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
