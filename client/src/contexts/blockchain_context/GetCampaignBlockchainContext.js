import { createContext, useContext, useState } from "react"
import {
    useContract,
    useContractWrite,
} from '@thirdweb-dev/react'
import { useWallectConnectContext } from "./walletConnectContext"
import { ethers } from "ethers"

export const GetCampaignBlockchain = createContext()

export const GetCampaignBlockchainContext = ({ children }) => {

    const { address } = useWallectConnectContext()
    const { contract } = useContract('0xb13F0A53508d35413cD5c8e3298ffb31E4B33460')

    const getAllCampaignsTransaction = async () => {
        try {
            const data = await contract.call("getCampaigns")
            console.log(data)
            return data
        } catch (e) {
            console.error('----- getAllCampaignsTransaction -----' + e)
        }
    }

    const getUserCampaigns = async () => {
        const userCampaigns = await contract.call("getCampaigns")
        return userCampaigns.filter((campaign) => campaign.owner === address);
      }

    const donateTransaction = async (pId, amount) => {
        const data = await contract.call('donateToCampaign', pId, {
            value: ethers.utils.parseEther(amount)
        });
        return data
    }

    return (<GetCampaignBlockchain.Provider
        value={{
            contract,
            
            getAllCampaignsTransaction,
            getUserCampaigns,
            donateTransaction
        }}>
        {children}
    </GetCampaignBlockchain.Provider>)
}

export const useGetCampaignBlockchainContext = () => useContext(GetCampaignBlockchain);