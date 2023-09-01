import React, { useState } from 'react'
import { AdminNav } from '../components/ComponentsIndex'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAdminLoginContext } from '../contexts/admin_context/AdminLoginContext'
import { Alert, AlertTitle } from '@mui/material'
import { auth } from '../firebase/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { useEstimatedDataContext } from '../contexts/admin_context/EstimatedDataContext'

const Admin = () => {
  
  const navigation = useNavigate()
  const { info, setInfo } = useAdminLoginContext()
  const { getEstimatedData } = useEstimatedDataContext()

  useState(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid
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
      <AdminNav />
      <div className="container">
        <Alert severity="info" className="mt-3 mb-3">
          <AlertTitle>Account Info</AlertTitle>
          <div className="d-flex gap-3">
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
        </Alert>
        <Outlet />
      </div>
    </React.Fragment>
  )
}

export default Admin
