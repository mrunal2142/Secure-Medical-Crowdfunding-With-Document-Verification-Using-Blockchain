import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config"

const AdminLogin = createContext()

export const AdminLoginContext = ({ children }) => { // for index.js

    const nav = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [infoAlert, setInfoAlert] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [info, setInfo] = useState({
        uid: "",
        email: "",
        lstTimeSignIn: ""
    })
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const signIn = () => {
        setInfoAlert(true)
        setErrorAlert(false)
        setSuccessAlert(false)
        document.getElementById('signInBtn').disabled = true
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // const user = userCredential.user;
                setInfoAlert(false)
                setSuccessAlert(true)
                setIsSignedIn(true)
                setTimeout(() => {
                    setSuccessAlert(false)
                    nav('/admin/dashboard')
                }, 3000)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode + " --- " + errorMessage)
                setErrorAlert(true)
                setInfoAlert(false)
                setErrorMsg(errorCode + " - " + errorMessage)
                setTimeout(() => {
                    setErrorAlert(false)
                    document.getElementById('signInBtn').disabled = false
                }, 3000)
            });
    }

    return (<AdminLogin.Provider value={{
        //states
        user, setUser,
        infoAlert, setInfoAlert,
        successAlert, setSuccessAlert,
        info, setInfo,
        isSignedIn, setIsSignedIn,
        errorAlert, setErrorAlert,
        errorMsg, setErrorMsg,
        // functions
        signIn
    }}>
        {children}
    </AdminLogin.Provider>)
}

export const useAdminLoginContext = () => useContext(AdminLogin) // to use in components

