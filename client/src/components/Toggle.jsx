import React, { useEffect, useState } from 'react'
import { useAdminBlockChainContext } from '../contexts/blockchain_context/AdminBlockChainContext'
import { storage } from '../firebase/firebase-config'
import { ref, getDownloadURL } from 'firebase/storage'

const Toggle = ({ application }) => {
  const { setTemp } = useAdminBlockChainContext()
  const [pdf, setPdf] = useState(
    'https://firebasestorage.googleapis.com/v0/b/final-year-project-01-b05fb.appspot.com/o/Patient-Certificates%2Fd67a6750-93c2-43fd-9e32-c3659c1e102a?alt=media&token=f341c5ba-640d-4f0b-810b-b1df05d0930a&_gl=1*sgsjwm*_ga*MTY2NjMwNzc5NC4xNjY0MTE1MzY5*_ga_CW55HF8NVT*MTY5NjQ0NTExNS45LjEuMTY5NjQ0NzQ5Ny4xNC4wLjA.'
  )

  const getPdf = () => {
    const storageRef = ref(storage, `${application.patientTag}`)
    getDownloadURL(storageRef)
      .then((url) => {
        setPdf(url)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getPdf()
  }, [])

  return (
    <React.Fragment>
      <div className="w-25 h-75 z-3 bg-light position-absolute rounded border m-2 overflow-auto overflow-x-hidden">
        <div class="row justify-content-end">
          <button
            type="button"
            class="btn btn-danger btn-sm m-1 w-25"
            onClick={() => {
              setTemp({
                showToggle: false,
              })
            }}
          >
            Close
          </button>
        </div>

        <div
          id="main-dashboard-heading"
          className="text-center d-flex flex-column mt-4 mb-4"
        >
          <span className="fs-4">Comprehensive Information</span>
          <span>
            Application Information -{' '}
            {application.adminHashCode.substring(0, 15)}
          </span>
        </div>

        <div className="border rounded m-2 p-1 bg-white">
          <div className="row ps-2 pe-2">
            <div className="col-4 fs-6 fw-semibold">Property</div>
            <div className="col fw-semibold">Value</div>
          </div>

          {Object.entries(application).map(([key, value]) => (
            <div className="row ps-2 pe-2">
              <div className="col-4">{key}</div>
              <div className="col ">: {value.substring(0, 15)}</div>
            </div>
          ))}
        </div>

        <embed
          className="p-2"
          src={pdf}
          style={{ width: '100%', height: '100%' }}
        ></embed>

        <div class="row justify-content-end">
          <button
            type="button"
            class="btn btn-danger btn-sm m-1 w-25"
            onClick={() => {
              setTemp({
                showToggle: false,
              })
            }}
          >
            Close
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Toggle
