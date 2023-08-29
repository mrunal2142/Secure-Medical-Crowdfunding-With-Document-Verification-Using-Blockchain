import React from 'react'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import KeyboardTabOutlinedIcon from '@mui/icons-material/KeyboardTabOutlined'

const AdminLogin = () => {
  return (
    <React.Fragment>
      <div
        class="card shadow position-absolute top-50 start-50 translate-middle"
        style={{ width: '35rem' }}
      >
        <div class="card-body m-2">
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
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Username *"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                #
              </span>
              <input
                type="password"
                class="form-control"
                placeholder="Password *"
                aria-label="Password"
                aria-describedby="basic-addon1"
              />
            </div>

            <div class="input-group d-flex gap-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
              />

              <span>Remember me</span>
            </div>

            <div class="d-grid gap-2 mt-3">
              <button class="btn btn-primary btn-sm" type="button">
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
