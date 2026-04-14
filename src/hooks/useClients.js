'use client';

import { useAuth } from "@/context/AuthContext";
import { getClients } from "@/services/client.service";
import { useEffect, useState } from "react";

export const useClients = () => {

    const { user } = useAuth();
    
    const [ clients, setClients ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchClients = async () => {
        try {
            const data = await getClients(user?.agency_id);
            setClients(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // 🔹 ADD (después de respuesta OK)
    const addClient = (newClient) => setClients(prev => [newClient, ...prev]);

    // 🔹 UPDATE (después de respuesta OK)
    const editClient = (updatedClient) => setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));

    // 🔹 DELETE (después de respuesta OK)
    const removeClient = (id) => setClients(prev => prev.filter(c => c.id !== id));

    useEffect(() => {
        if (!user?.agency_id) return;
        fetchClients();
    }, [user])

    return {
        clients,
        loading,
        fetchClients,
        addClient,
        editClient,
        removeClient
    }

}