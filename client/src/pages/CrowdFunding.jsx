import React, { useEffect } from 'react'
import { CampaignNav, Loader, Toggle } from '../components/ComponentsIndex'
import { Outlet, useNavigate } from 'react-router-dom'
import { useCampaignBlockchainContext } from '../contexts/blockchain_context/CampaignBlockchainContext'
import { useAdminBlockChainContext } from '../contexts/blockchain_context/AdminBlockChainContext'

const CrowdFunding = () => {
  const navigation = useNavigate()
  useEffect(() => {
    navigation('/crowdFunding/campaignCatalog')
  }, [])

  const { showLoader } = useCampaignBlockchainContext()

  const {  temp } = useAdminBlockChainContext()

  return (
    <React.Fragment>
      {showLoader.loaderFlag && (
      <Loader
          title={showLoader.loaderTitle}
          message={showLoader.loaderMessage}
        />
      )} 
      <CampaignNav />
      {temp.showToggle && <Toggle application={temp.application} />}
      <Outlet />
    </React.Fragment>
  )
}

export default CrowdFunding
