'use client';

import { getCurrentUser } from "@/services/auth.service";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
        .then(setUser)
        .finally(() => setLoading(false));
    }, []);

    const contextValue = {
        user,
        loading
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);