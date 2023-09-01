import { createContext, useContext, useEffect, useState } from "react";
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

const AdminApplication = createContext()

export const AdminApplicationContext = ({ children }) => {

    const initalEligibility = {
        disease: "",
        askingValue: ""
    }
    const [eligibility, setEligibility] = useState(initalEligibility)

    const [showCheckAlert, setShowCheckAlert] = useState(false)
    const initalCheckAlert = {
        severity: "",
        message: ""
    }
    const [checkAlert, setCheckAlert] = useState(initalCheckAlert)

    const initialApplicationState = {
        aadharNo: "",
        panNo: "",
        patientName: "",
        patientTag: "",
        fundRaiserName: "",
        hashCode: ""
    };
    const [application, setApplication] = useState(initialApplicationState)

    const [isVerified, setIsVerfied] = useState(false)

    // step - 01 - Check Eligibility
    const checkEligibility = () => {

        setShowCheckAlert(true)
        setCheckAlert({
            severity: "info",
            message: "Please wait..."
        })

        fetch(`https://script.google.com/macros/s/AKfycbx42WG0AZN1tgpITxpTgzwGW_De2r2ZFNSyZcRCIXte5OGDAJEEuPyx6j0Fl7wh91xk/exec?disease=${eligibility.disease}`)
            .then((res) => res.json())
            .then((entries) => {
                if ((parseFloat(eligibility.askingValue) * 0.0005) <= parseFloat(entries.data[0].cost_ethereum)) {
                    setCheckAlert({
                        severity: "success",
                        message: "The applicant is eligible for registration | Please wait..."
                    })
                    document.querySelector('#admin-application-div').classList.remove('disabled')
                } else {
                    setCheckAlert({
                        severity: "error",
                        message: "The applicant is not eligible for registration | Please wait..."
                    })
                }
                setTimeout(() => {
                    setShowCheckAlert(false)
                }, 3000)
            })
            .catch((e) => {
                console.error('checkEligibility --- ' + e)
            })
    }

    //step - 02 - generate hash for user data 
    const SHA256 = require("crypto-js/sha256");
    const generateHash = () => {

        const message = application.aadharNo + application.panNo +
            application.patientName + application.patientTag +
            eligibility.disease + eligibility.askingValue +
            application.fundRaiserName,

            nonce = "96adfa655adfa84adfa945", path = "temp", privateKey = "finalYearProject"; // ...

        const hashDigest = sha256(nonce + message);
        const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));

        setApplication((prev) => ({
            ...prev,
            hashCode: hmacDigest
        }))
        document.querySelector('#verify-check').classList.remove('disabled')
    }

    //step - 03 - manual checkbox
    useEffect(() => {
        if (isVerified) {
            document.querySelector('#upload-blockChain').classList.remove('disabled')
        }
    }, [isVerified])

    //step - 04 - upload data to blockchain 

    return (<AdminApplication.Provider value={{
        eligibility, setEligibility,
        showCheckAlert, setShowCheckAlert,
        checkAlert, setCheckAlert,
        application, setApplication,
        isVerified, setIsVerfied,
        
        checkEligibility, generateHash
    }} >
        {children}
    </AdminApplication.Provider>)
}

export const useAdminApplicationContext = () => useContext(AdminApplication)