import React from 'react'
import { Link } from 'react-router-dom'

const AppNav = () => {
  const links =
    'link-dark link-underline-opacity-0 link-underline-opacity-0-hover'

  return (
    <React.Fragment>
      <nav class="navbar bg-body shadow-sm">
        <div class="container-fluid fs-5 p-2 container">
          <Link to="/" className={links}>
            Trust Fund
          </Link>

          <div className="d-flex gap-3 fs-6">
            <Link to="/" className={links}>
              Home
            </Link>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://console.firebase.google.com/project/final-year-project-01-b05fb/authentication/users"
              className="link-dark link-underline-opacity-0 link-underline-opacity-0-hover"
            >
              Master Admin
            </a>

            <Link to="/adminLogin" className={links}>
              Admin Login
            </Link>

            <Link to="/crowdFunding" className={links}>
              Crowd Funding
            </Link>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default AppNav
