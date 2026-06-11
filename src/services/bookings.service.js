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
        .eq("is_delete", false)
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
                status: "pending",
                source_booking: "system"
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

// services/bookings.service.js

export const updateBooking = async (book, form, packages) => {

    const updates = {};

    // Buscar el paquete seleccionado
    const selectedPackage = packages.find(
        p => p.id === form.package_id
    );

    // --------- Comparar cambios ---------

    if (book.package_id !== form.package_id) {
        updates.package_id = form.package_id;
    }

    if (book.travel_date !== form.travel_date) {
        updates.travel_date = form.travel_date;
    }

    if (Number(book.pax) !== Number(form.pax)) {
        updates.pax = Number(form.pax);
    }

    if (book.status !== form.status) {
        updates.status = form.status;
    }

    // --------- Recalcular total ---------

    let newTotal = Number(book.total);

    const packageChanged =
        book.package_id !== form.package_id;

    const paxChanged =
        Number(book.pax) !== Number(form.pax);

    if (packageChanged || paxChanged) {

        newTotal =
            Number(selectedPackage.price) *
            Number(form.pax);

        updates.total = newTotal;
    }

    // Si no hubo cambios
    if (Object.keys(updates).length === 0) {
        return {
            updated: false,
            message: "Sin cambios"
        };
    }

    // Actualizar booking
    const { data, error } = await clientDB
        .from("bookings")
        .update(updates)
        .eq("id", book.id)
        .select(`
            *,
            clients!inner(*),
            packages!inner(*)
        `)
        .single();

    if (error) throw error;

    // ------------------------
    // Actualizar remaining del payment
    // ------------------------

    if (updates.total !== undefined) {

        const { data: payment } = await clientDB
            .from("payments")
            .select("*")
            .eq("booking_id", book.id)
            .single();

        if (payment) {

            const paid =
                Number(payment.amount);

            const remaining =
                Math.max(newTotal - paid, 0);

            await clientDB
                .from("payments")
                .update({
                    remaining
                })
                .eq("id", payment.id);

        }
    }
    

    return {
        updated: true,
        booking: data
    };

};

export const deleteBooking = async (id) => {

    const { error } = await clientDB
        .from("bookings")
        .update({
            is_delete: true
        })
        .eq("id", id);

    if (error) throw error;

    return true;

};