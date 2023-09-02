import { createContext, useContext } from "react";
import {
    useContract,
    useContractWrite,
    useContractRead,
} from '@thirdweb-dev/react'


export const AdminBlockChain = createContext()

export const AdminBlockChainContext = ({ children }) => {

    const { contract } = useContract('0x171B6f6690936709A1974f83c693AD26854e1924')

    const { mutateAsync: createApplication } = useContractWrite(contract, "createApplication")

    const createApplicationTransaction = async (obj) => {
        try {
            console.log('please wait ... ')
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
            ]});
            console.info("contract call successs", data);
        } catch (e) {
            console.error('createApplicationTraction error --- ' + e)
        }
    }

    return (<AdminBlockChain.Provider value={{
        createApplicationTransaction
    }}>
        {children}
    </AdminBlockChain.Provider>)
}

export const useAdminBlockChainContext = () => useContext(AdminBlockChain)