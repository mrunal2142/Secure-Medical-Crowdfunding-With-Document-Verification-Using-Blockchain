import React from 'react'
import { CampaignCard } from '../components/ComponentsIndex'
const CampaignCatalog = () => {
  return (
    <React.Fragment>
      <div
        id="campaign-catalog-main div"
        className="container p-2 border overflow-auto mt-2"
        style={{ height: '85vh' }}
      >
        <div
          id="campaign-catalog-heading"
          className="text-center d-flex flex-column mt-4 mb-4"
        >
          <span className="fs-4">Campaign Catalog</span>
          Campaigns catalogs serve as a trusted gateway, connecting
          compassionate donors with legitimate and impactful charitable causes.
        </div>

        <div
          id="campaign-catalog-div"
          className="d-flex gap-3 flex-wrap justify-content-center"
        >
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
        </div>
      </div>
    </React.Fragment>
  )
}

export default CampaignCatalog
