import { createContext, useContext, useState } from "react";

const EstimatedData = createContext()

export const EstimatedDataContext = ({ children }) => {

    const [estData, setEstData] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)

    const getEstimatedData = () => {
        fetch('https://script.google.com/macros/s/AKfycbx42WG0AZN1tgpITxpTgzwGW_De2r2ZFNSyZcRCIXte5OGDAJEEuPyx6j0Fl7wh91xk/exec')
            .then((res) => res.json())
            .then((entries) => {
                setEstData(entries.data)
                setDataLoaded(true)
            })
            .catch((e) => {
                console.error('getEstimatedData --- ' + e)
            })
    }

    return <EstimatedData.Provider value={{
        estData, setEstData,
        dataLoaded, setDataLoaded,

        getEstimatedData
    }}>
        {children}
    </EstimatedData.Provider>
}

export const useEstimatedDataContext = () => useContext(EstimatedData)