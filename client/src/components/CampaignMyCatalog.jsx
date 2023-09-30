import React from 'react'
import { CampaignCard } from '../components/ComponentsIndex'


const CampaignMyCatalog = () => {
  return (
    <React.Fragment>
      <div
        id="my-campaign-catalog-main div"
        className="container p-2 border overflow-auto mt-2"
        style={{ height: '85vh' }}
      >
        <div
          id="my-campaign-catalog-heading"
          className="text-center d-flex flex-column mt-4 mb-4"
        >
          <span className="fs-4">My Campaign Catalog</span>
          Comprehensive overview of the campaigns you have personally uploaded and managed.
        </div>

        <div
          id="my-campaign-catalog-div"
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
          
        </div>
      </div>
    </React.Fragment>
  )
}

export default CampaignMyCatalog