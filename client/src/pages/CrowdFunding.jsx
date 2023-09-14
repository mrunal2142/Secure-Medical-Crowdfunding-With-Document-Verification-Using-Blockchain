import React, { useEffect } from 'react'
import { CampaignNav } from '../components/ComponentsIndex'
import { Outlet, useNavigate } from 'react-router-dom'

const CrowdFunding = () => {
  
  const navigation = useNavigate()
  useEffect(() => {
    navigation('/crowdFunding/campaignCatalog')
  }, [])
 
  return (
    <React.Fragment>
      <CampaignNav />
      <Outlet />
    </React.Fragment>
  )
}

export default CrowdFunding
