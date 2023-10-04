import { createContext, useContext, useEffect, useState } from "react";
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { storage } from '../../firebase/firebase-config'
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid'
const AdminApplication = createContext()

export const AdminApplicationContext = ({ children }) => {

    const initalEligibilityState = {
        disease: "",
        askingValue: ""
    }
    const [eligibility, setEligibility] = useState(initalEligibilityState)

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
            severity: "primary",
            message: "Please wait..."
        })

        fetch(`https://script.google.com/macros/s/AKfycbx42WG0AZN1tgpITxpTgzwGW_De2r2ZFNSyZcRCIXte5OGDAJEEuPyx6j0Fl7wh91xk/exec?disease=${eligibility.disease}`)
            .then((res) => res.json())
            .then((entries) => {
                if ((parseFloat(eligibility.askingValue)) <= parseFloat(entries.data[0].cost_ethereum)) {
                    setCheckAlert({
                        severity: "success",
                        message: "The applicant is eligible for registration | Please wait..."
                    })
                    document.querySelector('#admin-application-div').classList.remove('disabled')
                } else {
                    setCheckAlert({
                        severity: "danger",
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

    // step - 01 - A - Upload certificate
    const [file, setFile] = useState({
        patientFile: null,
        isUploaded: false,
        patientFileURL: "s"
    })
    const uploadCertificate = () => {
        
        document.querySelector('#fileUpload').disabled = true
        setShowCheckAlert(true)
        setCheckAlert({
            severity: "primary",
            message: "Uploading File. Please wait..."
        })
        if (file.patientFile === null) {
            setCheckAlert({
                severity: "danger",
                message: "File not fetched properly. Patient Certificate - NULL"
            })
            setTimeout(() => {
                setShowCheckAlert(false)
            }, 3000)
            document.querySelector('#fileUpload').disabled = false
            return
        }
        const storageRef = ref(storage, `Patient-Certificates/${v4()}`);
        uploadBytes(storageRef, file.patientFile).then((snapshot) => {
            setCheckAlert({
                severity: "success",
                message: "File Uploaded | Please wait..."
            })
            setFile((prev) => ({
                ...prev,
                isUploaded: true,
                patientFileURL: snapshot.metadata.fullPath.toString()
            }))
            setTimeout(() => {
                setShowCheckAlert(false)
            }, 2000)
        });
        
    }

    //step - 02 - generate hash for user data 
    // const SHA256 = require("crypto-js/sha256");
    const generateHash = () => {
        document.querySelector('#generate-hash').disabled = true
        console.log(application)
        const message = application.aadharNo + application.panNo +
            application.patientName +
            // application.patientTag +
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
        if (isVerified && file.isUploaded) {
            console.log(file)
            document.querySelector('#upload-blockChain').classList.remove('disabled')
        }
    }, [isVerified, file.isUploaded])

    //step - 04 - upload data to blockchain - ( done in admin blockchain context )

    return (<AdminApplication.Provider value={{

        initalEligibilityState,
        initialApplicationState,

        eligibility, setEligibility,
        showCheckAlert, setShowCheckAlert,
        checkAlert, setCheckAlert,
        application, setApplication,
        isVerified, setIsVerfied,
        file, setFile,

        checkEligibility, generateHash, uploadCertificate
    }} >
        {children}
    </AdminApplication.Provider>)
}

export const useAdminApplicationContext = () => useContext(AdminApplication)