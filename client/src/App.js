import React from 'react'
import { Admin, CrowdFunding } from './pages/PageIndex'
import { AdminDashboard, AppMain, AppNav, AdminLogin, AdminApplications, AdminEstimations, CampaignCatalog, CampaignCreate, CampaignMyCatalog, CampaignDetails } from './components/ComponentsIndex'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLoginContext } from './contexts/admin_context/AdminLoginContext';
import { EstimatedDataContext } from './contexts/admin_context/EstimatedDataContext';
import { AdminApplicationContext } from './contexts/admin_context/AdminApplicationContext';
import { WalletConnectContext } from './contexts/blockchain_context/walletConnectContext';
import { AdminBlockChainContext } from './contexts/blockchain_context/AdminBlockChainContext';
import { CampaignBlockchainContext } from './contexts/blockchain_context/CampaignBlockchainContext';
import { GetCampaignBlockchainContext } from './contexts/blockchain_context/GetCampaignBlockchainContext';


const App = () => {

  return (
    <BrowserRouter>
      <AdminLoginContext>
        <WalletConnectContext>
          <CampaignBlockchainContext>
            <AdminBlockChainContext>
              <EstimatedDataContext>
                <AdminApplicationContext>
                  <GetCampaignBlockchainContext>
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
                          <Route path='/crowdFunding' element={<CrowdFunding />} >
                            <Route path='campaignCatalog' element={<CampaignCatalog />} />
                            <Route path='CampaignCreate' element={<CampaignCreate />} />
                            <Route path='CampaignMyCatalog' element={<CampaignMyCatalog />} />
                            <Route path="CampaignDetails/:title" element={<CampaignDetails />} />
                          </Route>
                        </Routes>
                      </div>
                    </React.Fragment>
                  </GetCampaignBlockchainContext>
                </AdminApplicationContext>
              </EstimatedDataContext>
            </AdminBlockChainContext>
          </CampaignBlockchainContext>
        </WalletConnectContext>
      </AdminLoginContext>
    </BrowserRouter>
  )
}

export default App