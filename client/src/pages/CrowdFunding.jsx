import React, { useEffect } from 'react'
import { CampaignNav, Loader } from '../components/ComponentsIndex'
import { Outlet, useNavigate } from 'react-router-dom'
import { useCampaignBlockchainContext } from '../contexts/blockchain_context/CampaignBlockchainContext'

const CrowdFunding = () => {
  const navigation = useNavigate()
  useEffect(() => {
    navigation('/crowdFunding/campaignCatalog')
  }, [])

  const { showLoader } = useCampaignBlockchainContext()

  return (
    <React.Fragment>
      {showLoader.loaderFlag && (
      <Loader
          title={showLoader.loaderTitle}
          message={showLoader.loaderMessage}
        />
      )} 
      <CampaignNav />
      <Outlet />
    </React.Fragment>
  )
}

export default CrowdFunding
