import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import axios from 'axios'
import {useNavigate} from "react-router-dom";
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    const logOut = async () => {
        setLoading(true)
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true,
        })
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    // Get token from server
    const getToken = async email => {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email },
            { withCredentials: true }
        )
        return data
    }

    // save user
    const saveUser = async (user, name, role, bankaccount, salary, designation, photo) => {
        const currentUser = {
            email: user?.email,
            name: name,
            role: role,
            bankaccount: bankaccount,
            salary: salary,
            designation: designation,
            photo: photo,
            isVerfied: false,
            isFired: false

        }
        const { data } = await axios.put(
            `${import.meta.env.VITE_API_URL}/user`,
            currentUser
        )
        console.log("Save User:",currentUser)
        return data
    }

    // onAuthStateChange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                getToken(currentUser.email)
                //saveUser(currentUser)
            }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logOut,
        updateUserProfile,
        saveUser
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    // Array of children.
    children: PropTypes.array,
}

export default AuthProvider
