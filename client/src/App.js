import React from 'react'
import { Admin, CrowdFunding } from './pages/PageIndex'
import { AdminDashboard, AppMain, AppNav, AdminLogin, AdminApplications, AdminEstimations } from './components/ComponentsIndex'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLoginContext } from './contexts/admin_context/AdminLoginContext';
import { EstimatedDataContext } from './contexts/admin_context/EstimatedDataContext';
import { AdminApplicationContext } from './contexts/admin_context/AdminApplicationContext';

const App = () => {

  return (
    <BrowserRouter>
      <AdminLoginContext>
        <EstimatedDataContext>
          <AdminApplicationContext>
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
          </AdminApplicationContext>
        </EstimatedDataContext>


      </AdminLoginContext>
    </BrowserRouter>
  )
}

export default App