'use client';

import { useAuth } from "@/context/AuthContext";
import { getPackages } from "@/services/packages.service";
import { useEffect, useState } from "react";

export const usePackages = () => {

    const { user } = useAuth();
    
    const [ packs, setPacks ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchPacks = async () => {
        try {
            const data = await getPackages(user?.agency_id);
            setPacks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user?.agency_id) return;
        fetchPacks();
    }, [user])

    return {
        packs,
        loading,
        fetchPacks
    }

}