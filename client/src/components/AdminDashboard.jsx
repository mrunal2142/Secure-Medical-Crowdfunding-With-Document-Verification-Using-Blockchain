import React, { useEffect, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useAdminBlockChainContext } from '../contexts/blockchain_context/AdminBlockChainContext'
import { useWallectConnectContext } from '../contexts/blockchain_context/walletConnectContext'
import {Toggle} from './ComponentsIndex'

const AdminDashboard = () => {
  const [allApplications, setAllApplications] = useState([])
  const {
    contract,
    setTemp,
    getAllApplicationsTransaction,
  } = useAdminBlockChainContext()
  const { address } = useWallectConnectContext()

  const fetchApplications = async () => {
    try {
      const tempData = await getAllApplicationsTransaction()
      if (tempData) {
        setAllApplications(tempData)
        console.log(allApplications)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [contract])

  // const [temp, setTemp] = useState(null)
  // useEffect(() => {
  //   console.log(temp)
  // }, [temp])
   
  return (
    <React.Fragment>

      <div
        className="border "
        id="main-dashboard-div"
        style={{ height: '70vh' }}
      >
        <div
          id="main-dashboard-heading"
          className="text-center d-flex flex-column mt-4 mb-4"
        >
          <span className="fs-4">Uploaded Applications</span>
          <span>Application uploaded by above mentioned wallet address.</span>
        </div>

        <div
          className="p-3  overflow-auto "
          id="admin-dashboard-info-div"
          style={{ height: '85%' }}
        >
          <div id="admin-dashboard-self-upload-div">
            <div
              id="admin-upload-heading"
              className="d-flex gap-2 align-items-center"
            >
              <span
                className="flex-grow-1 border-bottom"
                style={{ height: '0.1rem' }}
              ></span>
              <span className="ms-2 me-2 fs-6 fw-semibold">
                Admin Application Uploads
              </span>
              <span
                className="flex-grow-1 border-bottom"
                style={{ height: '0.1rem' }}
              ></span>
            </div>
          </div>

          <div id="admin-dashboard-self-data-div overflow-auto ">
            <div className="row border-bottom border-top bg-light  round text-center m-2 mt-4 p-1">
              <div className="col fs-6">Admin</div>
              <div className="col fs-6">Aadhar No</div>
              <div className="col fs-6">Pan No</div>
              <div className="col fs-6">HashCode</div>
              <div className="col fs-6">More Details</div>
            </div>

            <div id="data-div" className="m-2 mt-4">
              {allApplications.map((application, index) => (
                <div className="row  border-bottom p-1 text-center ">
                  {/* {Object.entries(application).map(([key, value]) => (
                    <div className="col fs-6 overflow-auto " key={key}>
                      {value}
                    </div>
                    {admin, aadharNo, panNo, patientName, patientTag, disease, amount, fundRaiserName, adminHashCode}
                  ))} */}

                  <>
                    <div className="col fs-6 overflow-auto p-3" key={index}>
                      <span>{application.admin.substring(0, 12)}</span>
                    </div>
                    <div className="col fs-6 overflow-auto p-3" key={index}>
                      <span>{application.aadharNo}</span>
                    </div>
                    <div className="col fs-6 overflow-auto p-3" key={index}>
                      <span>{application.panNo}</span>
                    </div>
                    <div className="col fs-6 overflow-auto p-3" key={index}>
                      <span>{application.adminHashCode}</span>
                    </div>
                    <div className="col fs-6 overflow-auto p-3" key={index}>
                      <button type="button" class="btn btn-primary btn-sm"
                        onClick={() => {
                          setTemp({
                            application:application, 
                            showToggle:true
                          })
                        }}
                      >
                        View
                      </button>
                    </div>
                  </>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminDashboard
