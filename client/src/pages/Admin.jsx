import React, { useState } from 'react'
import { AdminNav, Loader } from '../components/ComponentsIndex'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAdminLoginContext } from '../contexts/admin_context/AdminLoginContext'
import { Alert, AlertTitle } from '@mui/material'
import { auth } from '../firebase/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { useEstimatedDataContext } from '../contexts/admin_context/EstimatedDataContext'
import { useWallectConnectContext } from '../contexts/blockchain_context/walletConnectContext'
import { useAdminBlockChainContext } from '../contexts/blockchain_context/AdminBlockChainContext'

const Admin = () => {
  const navigation = useNavigate()
  const { info, setInfo } = useAdminLoginContext()
  const { getEstimatedData } = useEstimatedDataContext()
  const { address } = useWallectConnectContext()
  const { showLoader } = useAdminBlockChainContext()

  useState(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid
        setInfo({
          uid: user.uid,
          email: user.email,
          lstTimeSignIn: user.metadata.lastSignInTime,
        })
        navigation('/admin/dashboard')
      } else {
        // User is signed out
        navigation('/')
      }
    })

    getEstimatedData()
  }, [])

  return (
    <React.Fragment>
      {showLoader.loaderFlag && <Loader
        title = {showLoader.loaderTitle}
        message={showLoader.loaderMessage}
      />}
      <AdminNav />
      <div className="container">
        <div
          className="alert alert-primary mt-2 text-center d-flex flex-column"
          role="alert"
        >
          <strong>Account Information</strong>
          {address ? (
            <span className="text fs-6 p-1">
              MetaMask Wallet Connected ! @address - {address} {' '}
            </span>
          ) : (
            <strong className="text-danger fs-6">
              MetaMask Wallet Not Connected
            </strong>
          )}
          <div className="d-flex gap-3 fs-6 justify-content-center ">
            <span>
              <strong> UID</strong> - {info.uid}{' '}
            </span>
            <span>
              <strong> Email</strong> - {info.email}{' '}
            </span>
            <span>
              <strong> Last Signin Time</strong> - {info.lstTimeSignIn}
            </span>
          </div>
        </div>
        <Outlet />
      </div>
    </React.Fragment>
  )
}

export default Admin
