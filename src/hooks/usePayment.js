'use client';

import { useAuth } from "@/context/AuthContext";
import { getPayments } from "@/services/payments.service";
import { useEffect, useState } from "react";

export const usePayment = () => {

    const { user } = useAuth();

    const [ payments, setPayments ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchPayments = async () => {
        try {
            const data = await getPayments(user?.agency_id);
            setPayments(data || [])
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // 🔥 mutations (evita hacer refresh)
    const addPayment = (newPayment) => setPayments(prev => [newPayment, ...prev]);
    const editPayment = (updatedPayment) => setPayments(prev => prev.map(p => p.id === updatedPayment.id ? updatedPayment : p));
    const removePayment = (id) => setPayments(prev => prev.filter(p => p.id !== id));

    useEffect(() => {
        if (!user?.agency_id) return;
        fetchPayments();
    }, [user]);

    return {
        payments,
        loading,
        fetchPayments,
        addPayment,
        editPayment,
        removePayment
    }

}