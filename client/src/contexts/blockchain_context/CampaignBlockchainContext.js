import { createContext, useContext, useState } from "react";
import {
    useContract,
    useContractWrite,
} from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { useWallectConnectContext } from "./walletConnectContext";


export const CampaignBlockchain = createContext()

export const CampaignBlockchainContext = ({ children }) => {

    
    const [alert, setAlert] = useState({
        flag: false,
        alertType: "",
        alertMessage: ""
    })
    const [showApplicationData, setShowApplicationData] = useState(false)
    const [applicationData, setApplicationData] = useState({})
    const [showLoader, setShowLoader] = useState({
        loaderTitle: '',
        loaderMessage: '',
        loaderFlag: false
    })

    /* ADMIN CONTRACT */
    // const { tempcontract } = useContract('0x171B6f6690936709A1974f83c693AD26854e1924')
    const { contract } = useContract('0xfD8545c2A69d93C20f40019C764845562864f18b')
    const checkHashEligibility = async (obj) => {
        try {
            
            const data = await contract.call("checkValidHashCode", [obj.aadharNumber, obj.hashCode])
            if (data) {
                setAlert({
                    flag: true,
                    alertType: "success",
                    alertMessage: "Information verfied with admin ! \n You may proceed with your application"
                })
                document.querySelector('#crowd-funding').classList.remove('disabled')

                const adminApplicationData = await contract.call('getApplicationByKey', [obj.aadharNumber])
                // console.log(adminApplicationData.aadharNo.toString())
                const parsedData = {
                    admin: adminApplicationData.admin,
                    aadharNo: adminApplicationData.aadharNo.toString(),
                    panNo: adminApplicationData.panNo,
                    patientName: adminApplicationData.patientName,
                    patientTag: adminApplicationData.patientTag,
                    disease: adminApplicationData.disease,
                    amount: adminApplicationData.amount,
                    fundRaiserName: adminApplicationData.fundRaiserName,
                    adminHashCode: adminApplicationData.adminHashCode
                }
                setApplicationData(parsedData)
                setShowApplicationData(true)

            } else {

                setAlert({
                    flag: true,
                    alertType: "danger",
                    alertMessage: "Please verify your application at ADMIN DIVISION ! "
                })

                setTimeout(() => {
                    setAlert({
                        flag: false,
                    })
                }, [3000])

            }
        } catch (e) {
            console.error("----- checkHashEligibility ----- " + e)
        }
    }

    return (<CampaignBlockchain.Provider value={{
        alert, setAlert,
        showApplicationData, setShowApplicationData,
        applicationData, setApplicationData,
        showLoader, setShowLoader,

        
        checkHashEligibility
    }}>
        {children}
    </CampaignBlockchain.Provider>)
}

export const useCampaignBlockchainContext = () => useContext(CampaignBlockchain)