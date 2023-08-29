import React from 'react'
import { Admin, CrowdFunding } from './pages/PageIndex'
import { AppMain, AppNav } from './components/ComponentsIndex'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <AppNav />
        <div >
          <Routes>
            <Route path='/' element={<AppMain/>} />
            <Route path='/Admin' element={<Admin/>} />
            <Route path='/crowdFunding' element={<CrowdFunding/>} />
          </Routes>
        </div>

      </React.Fragment>
    </BrowserRouter>

  )
}

export default App