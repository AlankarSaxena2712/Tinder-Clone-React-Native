import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as Google from "expo-google-app-auth";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from '@firebase/auth';
import { auth } from '../Firebase';

const AuthContext = createContext({});

const config = {
    iosClientId: "576992015814-fstt12jio8scqf3cdjgup901na3afn5j.apps.googleusercontent.com",
    androidClientId: "576992015814-5eom1nnh81rtb1oseok571lm1a0qj18s.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoadingInitial(false);
        })
    }, []);

    const signInWithGoogle = async () => {
        setLoading(true);
        await Google.logInAsync(config).then(async (loginResult) => {
            if (loginResult.type === "success") {
                const { idToken, accessToken } = loginResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(auth, credential);
            }
            return Promise.reject();

        }).catch(error => setError(error))
        .finally(() => setLoading(false));
    };

    const logout = () => {
        setLoading(true);
        signOut(auth).catch(error => setError(error)).finally(() => setLoading(false));
    }

    const memoedValue = useMemo(() => ({
        signInWithGoogle,
        user,
        loading,
        error,
        logout,
    }), [user, loading, error]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
