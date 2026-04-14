import { clientDB } from "@/libs/supabase";
import { createdPayment } from "./payments.service";

/**
 * 🔹 GET ALL BOOKING (por agencia)
 */

export const getBookings = async (agency_id) => {
    const { data, error } = await clientDB
        .from('bookings')
        .select(`
            *,
            clients!inner (
                *
            ),
            packages!inner (
                *
            )
        `)
        .eq('agency_id', agency_id)
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
}

/**
 * 🔹 GCREATE BOOKING (por agencia)
 */

export const createBooking = async (quote) => {

    // 🔹 1. Crear booking
    const { data: booking, error } = await clientDB
        .from("bookings")
        .insert([
            {
                agency_id: quote.agency_id,
                client_id: quote.client_id,
                package_id: quote.package_id,
                travel_date: quote.travel_date,
                pax: quote.pax,
                total: quote.total,
                status: "pending"
            }
        ])
        .select()
        .single();

    if (error) throw error;

    const { data: bookCreated, error: errorInner } = await clientDB
        .from('bookings')
        .select(`
            *,
            clients!inner (*),
            packages!inner (*)
        `)
        .eq('agency_id', quote.agency_id)
        .eq('id', booking.id)
        .single();

    if (errorInner) throw errorInner;

    const payment = await createdPayment({
        agency_id: quote.agency_id,
        client_id: quote.client_id,
        booking_id: booking.id,
        amount: 0,
        is_partial: true,
        remaining: quote.total,
        method: 'pending'
    });

    // 🔹 2. Actualizar estado de la cotización
    await clientDB
        .from("quotes")
        .update({ status: "reserved" })
        .eq("id", quote.id);

    return {
        bookCreated,
        payment
    };
};