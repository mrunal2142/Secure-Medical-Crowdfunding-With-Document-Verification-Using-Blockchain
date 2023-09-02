import { createContext, useContext } from "react";
import {
    useAddress,
    useMetamask,
} from '@thirdweb-dev/react'

export const WalletConnect = createContext()

export const WalletConnectContext = ({ children }) => {

    const address = useAddress() //connected wallet address
    const connect = useMetamask() //for connecting metamask

    return (<WalletConnect.Provider value={{
        address,
        connect
    }}>
        {children}
    </WalletConnect.Provider>)
}

export const useWallectConnectContext = () => useContext(WalletConnect)