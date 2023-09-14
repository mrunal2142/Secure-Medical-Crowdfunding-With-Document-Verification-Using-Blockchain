import React from 'react'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import KeyboardTabOutlinedIcon from '@mui/icons-material/KeyboardTabOutlined'
import { Alert } from '@mui/material'
import { useAdminLoginContext } from '../contexts/admin_context/AdminLoginContext'

const AdminLogin = () => {
  const {
    setUser,
    infoAlert,
    successAlert,
    errorAlert,
    errorMsg,
    signIn,
  } = useAdminLoginContext()

  return (
    <React.Fragment>
      <div
        className="card shadow position-absolute top-50 start-50 translate-middle container"
        style={{ width: '35rem' }}
      >
        <div className="card-body m-2">
          {infoAlert && (
            <div className="alert alert-primary d-flex" role="alert">
              Please wait 
             
                <div
                  class="spinner-border spinner-border-sm ms-2"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              
            </div>
          )} 

          {successAlert && (
            <div className="alert alert-success" role="alert">
              Authentication Successful | Please wait 
              <div
                  class="spinner-border spinner-border-sm ms-2"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
            </div>
          )} 

          {errorAlert && (
            <div className="alert alert-success" role="alert">
              Authentication failed | Please wait 
              <div
                  class="spinner-border spinner-border-sm ms-2"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
            </div>
          )}

          <div className="d-flex gap-1 justify-content-center">
            <AdminPanelSettingsOutlinedIcon className="m-2" />
            <p className="fs-3">Admin Login</p>
          </div>

          <div className="d-flex flex-column mb-4">
            <span className="fs-5">Log In</span>
            <span className="fs-6">
              Login credentials are sent to your mail by master admin.
            </span>
          </div>

          <div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username *"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }))
                }}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                #
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password *"
                aria-label="Password"
                aria-describedby="basic-addon1"
                required
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    password: e.target.value,
                  }))
                }}
              />
            </div>

            <div className="input-group d-flex gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
              />

              <span>Remember me</span>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button
                id="signInBtn"
                className="btn btn-primary btn-sm"
                type="button"
                onClick={signIn}
              >
                <span className="fs-6">Log In</span>
                <KeyboardTabOutlinedIcon className="m-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminLogin
