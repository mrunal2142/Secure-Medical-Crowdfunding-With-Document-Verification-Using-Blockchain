import React from 'react'
import { Admin, CrowdFunding } from './pages/PageIndex'
import { AdminDashboard, AppMain, AppNav, AdminLogin, AdminApplications, AdminEstimations } from './components/ComponentsIndex'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLoginContext } from './contexts/AdminLoginContext';

const App = () => {

  return (
    <BrowserRouter>
      <AdminLoginContext>
        <React.Fragment>
          <AppNav />
          <div >
            <Routes>
              <Route path='/' element={<AppMain />} />
              <Route path='/adminLogin' element={<AdminLogin />} />
              <Route path='/admin' element={<Admin />} >
                <Route path='dashboard' element={<AdminDashboard />} />
                <Route path='applications' element={<AdminApplications />} />
                <Route path='estimations' element={<AdminEstimations />} />
              </Route>
              <Route path='/crowdFunding' element={<CrowdFunding />} />
            </Routes>
          </div>
        </React.Fragment>
      </AdminLoginContext>
    </BrowserRouter>
  )
}

export default App