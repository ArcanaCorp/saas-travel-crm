'use client';

import { useAuth } from "@/context/AuthContext";
import { getLandingKPIs } from "@/services/landing.service";
import { useEffect, useState } from "react";

export const useLanding = () => {

    const { user } = useAuth();
        
    const [ landing, setLanding ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchLanding = async () => {
        try {
            const data = await getLandingKPIs(user?.agency_id);
            setLanding(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user?.agency_id) return;
        fetchLanding();
    }, [user])

    return {
        landing,
        loading,
        fetchLanding
    }

}