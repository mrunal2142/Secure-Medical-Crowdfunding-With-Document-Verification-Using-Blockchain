import React from 'react'
import { Link } from 'react-router-dom'
import { useWallectConnectContext } from '../../contexts/blockchain_context/walletConnectContext'

const CampaignNav = () => {
  const links =
    'link-dark link-underline-opacity-0 link-underline-opacity-0-hover'

  const { address, connect } = useWallectConnectContext()
  return (
    <React.Fragment>
      <nav className="navbar bg-body shadow-sm border">
        <div className="container-fluid fs-5 p-2 container">
          <Link to="campaignCatalog" className={links}>
            Crowd Funding
          </Link>
          <div className="d-flex gap-3 fs-6">
            <Link to="campaignCatalog" className={links}>
              Campaign Catalog
            </Link>
            <Link to="CampaignCreate" className={links}>
              Create Campaign
            </Link>
            <Link to="CampaignMyCatalog" className={links}>
              Campaigns
            </Link>
            <span
              className={
                address
                  ? `btn btn-primary btn-sm  p-1`
                  : `btn btn-warning btn-sm p-1`
              }
              onClick={connect}
            >
              {address ? <span>Connected</span> : <span>Connect Metamask</span>}
            </span>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default CampaignNav
