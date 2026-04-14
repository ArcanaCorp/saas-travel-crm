'use client';

import { useAuth } from "@/context/AuthContext";
import { getBookings } from "@/services/bookings.service";
import { useEffect, useState } from "react";

export const useBooking = () => {

    const { user } = useAuth();

    const [ bookings, setBookings ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchBookings = async () => {
        try {
            const data = await getBookings(user?.agency_id);
            setBookings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // 🔹 ADD (después de respuesta OK)
    const addBooking = (newBooking) => setBookings(prev => [newBooking, ...prev]);
    
    // 🔹 UPDATE (después de respuesta OK)
    const editBooking = (updatedBooking) => setBookings(prev => prev.map(c => c.id === updatedBooking.id ? updatedBooking : c));
    
    // 🔹 DELETE (después de respuesta OK)
    const removeBooking = (id) => setBookings(prev => prev.filter(c => c.id !== id));
    
    useEffect(() => {
        if (!user?.agency_id) return;
        fetchBookings();
    }, [user])

    return {
        bookings,
        loading,
        fetchBookings,
        addBooking,
        editBooking,
        removeBooking
    }

}