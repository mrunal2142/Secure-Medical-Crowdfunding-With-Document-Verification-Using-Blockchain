import { createContext, useContext, useState } from "react";
import {
    useContract,
    useContractWrite,
    useContractRead,
} from '@thirdweb-dev/react'


export const AdminBlockChain = createContext()

export const AdminBlockChainContext = ({ children }) => {

    const [showLoader, setShowerLoader] = useState({
        loaderTitle: '',
        loaderMessage: '',
        loaderFlag: false
    })

    // const { contract } = useContract('0x171B6f6690936709A1974f83c693AD26854e1924')
    const { contract } = useContract('0xfD8545c2A69d93C20f40019C764845562864f18b')
    
    const { mutateAsync: createApplication } = useContractWrite(contract, "createApplication")

    const createApplicationTransaction = async (obj) => {
        try {
            setShowerLoader({
                loaderTitle: 'Transaction in process',
                loaderMessage: 'Your transaction is in the queue. Please be patient while miners confirm it',
                loaderFlag: true
            })
            const data = await createApplication({
                args: [
                    obj.address,
                    obj.aadharNo, // uint256
                    obj.panNo,

                    obj.patientName,
                    obj.patientTag,
                    obj.disease,

                    obj.askingValue,
                    obj.fundRaiserName,
                    obj.hashCode
                ]
            });
            setShowerLoader({
                loaderFlag: true,
                loaderTitle: 'Transaction confirmed ! ',
                loaderMessage: 'Transaction successful. Please be patient for a moment.',
            })
            console.info("contract call successs", data);
        } catch (e) {
            console.info('createApplicationTraction error --- ' + e);
            setShowerLoader({
                loaderFlag: true,
                loaderTitle: 'Transaction Failed ! ',
                loaderMessage: 'Oops! Something went wrong with your transaction. \n ' + e,
            })
            console.info("-------------------------", e);

        }
        setTimeout(() => {
            setShowerLoader({
                loaderFlag: false
            });
        }, 3000);

    }

    const getAllApplicationsTransaction = async () => {
        try {
            const data = await contract.call('getAllApplications');
            const parsedData = data.map((application, index) => ({
                admin: application.admin,
                aadharNo: application.aadharNo.toString(),
                panNo: application.panNo,
                patientName: application.patientName,
                patientTag: application.patientTag,
                disease: application.disease,
                amount: application.amount,
                fundRaiserName: application.fundRaiserName,
                adminHashCode: application.adminHashCode
            }))
            console.log('--- data parsed --- ')
            return parsedData
        } catch (e) {
            console.error('getAllApplicationsTransaction' + e)
        }
    }



    return (<AdminBlockChain.Provider value={{
        showLoader, setShowerLoader,

        createApplicationTransaction, getAllApplicationsTransaction
    }}>
        {children}
    </AdminBlockChain.Provider>)
}

export const useAdminBlockChainContext = () => useContext(AdminBlockChain)