'use client';

import { useAuth } from "@/context/AuthContext";
import { getPackages } from "@/services/packages.service";
import { useCallback, useEffect, useState } from "react";

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

    const addPack = useCallback((newPack) => {
        setPacks(prev => [newPack, ...prev]);
    }, []);

    const updatePack = useCallback((updatedPack) => {
        setPacks(prev =>
            prev.map(pack =>
                pack.id === updatedPack.id ? updatedPack : pack
            )
        );
        console.log(updatedPack);
    }, []);

    const removePack = useCallback((id) => {
        setPacks(prev =>
            prev.filter(pack => pack.id !== id)
        );
    }, []);

    useEffect(() => {
        if (!user?.agency_id) return;
        fetchPacks();
    }, [user])

    return {
        packs,
        loading,
        fetchPacks,
        addPack,
        updatePack,
        removePack
    }

}