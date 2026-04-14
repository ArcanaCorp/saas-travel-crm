'use client';

import { useAuth } from "@/context/AuthContext";
import { getQuotes } from "@/services/quotes.service";
import { useEffect, useState } from "react";

export const useQuotes = () => {

    const { user } = useAuth();
    
    const [ quotes, setQuotes ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchQuotes = async () => {
        try {
            const data = await getQuotes(user?.agency_id);
            setQuotes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // 🔹 ADD (después de respuesta OK)
    const addQuote = (newQuote) => {
        setQuotes(prev => [newQuote, ...prev])
    }

    // 🔹 UPDATE (después de respuesta OK)
    const editQuote = (updateQuote) => setQuotes(prev => prev.map(c => c.id === updateQuote.id ? updateQuote : c));

    // 🔹 DELETE (después de respuesta OK)
    const removeQuote = (id) => setQuotes(prev => prev.filter(c => c.id !== id));

    useEffect(() => {
        if (!user?.agency_id) return;
        fetchQuotes();
    }, [user])

    return {
        quotes,
        loading,
        fetchQuotes,
        addQuote,
        editQuote,
        removeQuote
    }

}