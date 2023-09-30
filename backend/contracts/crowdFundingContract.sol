// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract crowdFundingContract {
    
    struct CampaignData {
        //adminData
        uint256 aadharNo;
        string adminHashCode;
        //union
        uint256 target;
        // campaignData
        address owner;
        string title;
        string description;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => CampaignData) public campaigns;
    uint256 public numberOfCampaigns = 0;

    function createCampaigns(
        //admin
        uint256 _aadharNo,
        string memory _adminHashCode,
        //union
        uint256 _target,
        // campaignData
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _deadline
    ) public returns (uint256) {
        
        CampaignData storage campaign = campaigns[numberOfCampaigns];
        
        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future"
        );

        campaign.aadharNo = _aadharNo;
        campaign.adminHashCode = _adminHashCode;
        //union
        campaign.target = _target;
        // campaignData
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        return numberOfCampaigns++;
    }

    function donateToCampaign(uint256 _id) public payable {
        
        uint256 amount = msg.value;

        CampaignData storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected += amount;
        }
    }

    function getDonators(uint256 _id)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (CampaignData[] memory) {
        CampaignData[] memory allCampaigns = new CampaignData[](
            numberOfCampaigns
        );

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }
}
