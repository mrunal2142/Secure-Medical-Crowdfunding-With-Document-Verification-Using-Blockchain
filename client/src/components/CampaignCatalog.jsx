import React, { useEffect, useState } from 'react'
import { CampaignCard } from '../components/ComponentsIndex'
import { useGetCampaignBlockchainContext } from '../contexts/blockchain_context/GetCampaignBlockchainContext'
import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom'

const CampaignCatalog = () => {
  const [loading, setShowLoading] = useState(false)
  
  const {
    contract,
    getAllCampaignsTransaction,
  } = useGetCampaignBlockchainContext()
  
  const [allCampaigns, setAllCampaigns] = useState([])
  
  const fetchData = async () => {
    setShowLoading(true)
    try {
      const data = await getAllCampaignsTransaction()
      console.log(data)
      const temp = Object.entries(data).map(([key, value]) => ({
        aadharNo: parseInt(value.aadharNo).toString(),
        adminHashCode: value.adminHashCode,
        target: ethers.utils.formatEther(value.target.toString()),
        owner: value.owner,
        title: value.title,
        description: value.description,
        deadline: new Date(parseInt(value.deadline)).toLocaleDateString(),
        donators: value.donators,
        amountCollected: ethers.utils.formatEther(value.amountCollected.toString()),
        pId: key,
      }))
      
      setAllCampaigns(temp)
      console.log(temp[0].owner)
      setShowLoading(false)
    } catch (e) {
      console.log('----- fetchData -----' + e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [contract])

  const navigate = useNavigate()

  const handleNavigate = (campaign) => {
    navigate(`/crowdFunding/CampaignDetails/:title${campaign.title}`, {state: campaign})
  }

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
          <span className="fs-4">
            Campaign Catalog
            {loading && (
              <div
                class="spinner-border spinner-border-sm ms-3 mb-1"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            )}
          </span>
          Campaigns catalogs serve as a trusted gateway, connecting
          compassionate donors with legitimate and impactful charitable causes.
        </div>

        <div
          id="campaign-catalog-div"
          className="d-flex flex-wrap gap-2 justify-content-center"
        >
          {allCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.pId}
              title={campaign.title}
              deadline={campaign.deadline}
              description={campaign.description}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}

          
        </div>
      </div>
    </React.Fragment>
  )
}

export default CampaignCatalog
