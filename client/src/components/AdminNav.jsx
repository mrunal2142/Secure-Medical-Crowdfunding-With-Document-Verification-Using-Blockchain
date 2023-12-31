import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/firebase-config'
import { signOut } from 'firebase/auth'
import { useWallectConnectContext } from '../contexts/blockchain_context/walletConnectContext'

const AdminNav = () => {
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }

  const links =
    'link-dark link-underline-opacity-0 link-underline-opacity-0-hover'

  const { address, connect } = useWallectConnectContext()

  return (
    <React.Fragment>
      <nav className="navbar bg-body shadow-sm border">
        <div className="container-fluid fs-5 p-2 container">
          <Link to="dashboard" className={links}>
            Admin Divison
          </Link>
          <div className="d-flex gap-3 fs-6">
            <Link to="dashboard" className={links}>
              Dashboard
            </Link>
            <Link to="applications" className={links}>
              Applications
            </Link>
            <Link to="estimations" className={links}>
              Estimations
            </Link>
            <span className={address ?  `btn btn-primary btn-sm  p-1`   : `btn btn-warning btn-sm p-1`}onClick={connect}>
              {address ? (
                <span >Connected</span>
              ) : (
                <span >Connect Metamask</span>
              )}
            </span>
            <span className="btn btn-danger btn-sm  p-1" onClick={userSignOut}>
              Sign Out
            </span>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default AdminNav
