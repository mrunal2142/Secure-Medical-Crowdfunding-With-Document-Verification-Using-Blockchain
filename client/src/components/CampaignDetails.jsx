import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CountCard, EmptyCard } from './ComponentsIndex'
import { useContract, useContractWrite } from '@thirdweb-dev/react'
import { daysLeft } from '../utils/utils'
import { useGetCampaignBlockchainContext } from '../contexts/blockchain_context/GetCampaignBlockchainContext'
import { useCampaignBlockchainContext } from '../contexts/blockchain_context/CampaignBlockchainContext'
import { useWallectConnectContext } from '../contexts/blockchain_context/walletConnectContext'
import { useAdminBlockChainContext } from '../contexts/blockchain_context/AdminBlockChainContext'

const CampaignDetails = () => {
  const { address } = useWallectConnectContext()
  const {setTemp} = useAdminBlockChainContext()
  const { state } = useLocation()

  const remainingDays = daysLeft(state.deadline)

  const [amount, setAmount] = useState('')

  /* ADDITIONAL ADMIN INFO */
  const [adminInfo, setAdminInfo] = useState({})
  const { contract } = useContract('0xfD8545c2A69d93C20f40019C764845562864f18b')
  const getAdminInfo = async () => {
    const data = await contract.call('getApplicationByKey', [state.aadharNo])
    setAdminInfo({
      panNo: data.panNo,
      patientName: data.patientName,
      patientTag: data.patientTag,
      disease: data.disease,

      admin: data.admin,
      aadharNo: data.aadharNo.toString(),

      amount: data.amount,
      fundRaiserName: data.fundRaiserName,
      adminHashCode: data.adminHashCode,
    })
  }
  useEffect(() => {
    getAdminInfo()
  }, [])
  
  const { donateTransaction } = useGetCampaignBlockchainContext()

  const { setShowLoader } = useCampaignBlockchainContext()

  const handleDonate = async (e) => {
    e.preventDefault()
    try {
      setShowLoader({
        loaderTitle: 'Transaction in process',
        loaderMessage:
          'Your transaction is in the queue. Please be patient while miners confirm it',
        loaderFlag: true,
      })

      const data = await donateTransaction(state.pId, amount)

      setShowLoader({
        loaderFlag: true,
        loaderTitle: 'Transaction confirmed ! ',
        loaderMessage:
          'Transaction successful. Please be patient for a moment.',
      })
    } catch (E) {
      setShowLoader({
        loaderFlag: true,
        loaderTitle: 'Transaction Failed ! ',
        loaderMessage:
          'Oops! Something went wrong with your transaction. \n ' + e,
      })
      console.error('----- handleDonate ----- ' + E)
    }
    setTimeout(() => {
      setShowLoader({
        loaderFlag: false,
      })
    }, 3000)
  }



  return (
    <React.Fragment>
      <div
        id="campaign-catalog-main div"
        className="container p-2 border overflow-auto mt-2"
        style={{
          height: '85vh',
          textAlign: 'justify',
          textJustify: 'inter-word',
        }}
      >
        <div
          id="campaign-catalog-heading"
          className="text-center d-flex flex-column mt-4 mb-4"
        >
          <span className="fs-4">Campaign - {state.title}</span>
          Deadline - {state.deadline}
        </div>

        <div className="d-flex overflow-auto p-4 border rounded mb-3 shadow-sm">
          <div
            className="pe-3 d-flex flex-column"
            style={{
              width: '60%',
            }}
          >
            <span className="fs-5 text-center ">Campaign Description </span>
            {state.description}
          </div>
          <div
            className="border-start ps-3 d-flex flex-column"
            style={{ width: '40%' }}
          >
            <span className="fs-5 text-center">Admin Details </span>
            <span className="fs-6">
              <span className="fw-medium">Patient's Name - </span>
              {adminInfo.patientName}
            </span>
            <span className="fs-6">
              <span className="fw-medium">Disease - </span>
              {adminInfo.disease}
            </span>
            <span className="fs-6">
              <span className="fw-medium">PAN Number - </span>
              {adminInfo.panNo}
            </span>
            <span className="fs-6">
              <span className="fw-medium">Aadhar Number - </span>
              {state.aadharNo}{' '}
            </span>
            <span className="fs-6">
              <span className="fw-medium">Owner - </span>
              {state.owner}
            </span>

            <button type="button" class="btn btn-primary btn-sm mt-2" 
            
              onClick={() => {
                setTemp({
                  application:adminInfo, 
                  showToggle:true
                })
              }}
            >View Details</button>
          </div>
        </div>

        <div className="d-flex gap-3 mb-3">
          <CountCard title="Remaining Days" data={remainingDays} />
          <CountCard title="Raised Eth" data={state.amountCollected} />
          <CountCard title="Targeted Eth" data={state.target} />
          <CountCard title="Total Transactions" data={state.donators.length} />
          <div
            className="d-flex flex-column bg-success-subtle 
           flex-grow-1 border rounded shadow-sm justify-content-center align-items-center mt-2"
          >
            <span className="fs-1">Verfied </span>
            <span className="border w-100 text-center ">
              Admin verification
            </span>
          </div>
        </div>

        <div className="d-flex mt-2 gap-2 ">
          <div
            className=" border rounded shadow-sm p-3 text-center"
            style={{
              width: '60%',
              height: '40%',
            }}
          >
            <span className="fs-5">Campaign Transactions </span>
            {state.donators.length == 0 ? (
              <EmptyCard msg="Lead the Way in Giving: Be the First to Donate!" />
            ) : (
              <div className="mt-2 d-flex flex-column gap-2">
                {Object.entries(state.donators).map(([key, address]) => (
                  <span className="p-2" key={key}>
                    {key}. {address}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            className="border rounded shadow-sm p-3 "
            style={{
              width: '40%',
              height: '20%',
            }}
          >
            <div className="fs-5 text-center">Donate to Campaign</div>
            <form onSubmit={handleDonate}>
              <div class="mb-3 mt-3">
                <label for="exampleInputEmail1" className="form-label">
                  Amount ETH
                </label>
                <input
                  type="number"
                  step="0.5"
                  className="form-control"
                  id="emount"
                  aria-describedby="donation"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <div id="emailHelp" className="form-text">
                  Support the project for no reward, just because it speaks to
                  you.
                </div>
              </div>

              {state.owner === address ? (
                <button
                  type="submit"
                  className="btn btn-primary w-100 disabled"
                >
                  Cannot receive donations from owners.
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-100">
                  Donate
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CampaignDetails
