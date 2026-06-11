'use client';

import { useAuth } from "@/context/AuthContext";
import { getContacts } from "@/services/contact.service";
import { useEffect, useState } from "react";

export const useContact = () => {

    const { user } = useAuth();

    const [ contacts, setContacts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchContacts = async () => {
        try {
            const data = await getContacts(user?.agency_id);
            setContacts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user?.agency_id) return;
        fetchContacts();
    }, [user])

    return {
        contacts,
        loading,
        fetchContacts
    }

}