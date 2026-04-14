import { clientDB } from "@/libs/supabase";

export const getPayments = async (agency_id) => {
    try {
        const { data, error } = await clientDB
            .from('payments')
            .select(`
                *,
                clients!inner (
                    *
                ),
                bookings!inner (
                    *,
                    packages (
                        id,
                        name,
                        price,
                        type,
                        image
                    )
                )
            `)
            .eq('agency_id', agency_id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const createdPayment = async (payload) => {
    try {
        const { agency_id, client_id, booking_id, amount, is_partial = false, remaining = 0, method = 'cash', reference = null} = payload;
        // 🔹 1. INSERT
        const { data: inserted, error } = await clientDB
            .from('payments')
            .insert([{
                agency_id,
                client_id,
                booking_id,
                amount,
                is_partial,
                remaining,
                method,
                status: is_partial ? 'partial' : 'paid',
                paid_at: new Date()
            }])
            .select("id")
            .single();

        if (error) throw error;

        // 🔹 2. TRAER DATA COMPLETA (FORMATO IGUAL A GET)
        const { data: fullPayment, error: joinError } = await clientDB
            .from('payments')
            .select(`
                *,
                clients (
                    id,
                    name,
                    email,
                    phone
                ),
                bookings (
                    *,
                    packages (
                        id,
                        name,
                        price,
                        type,
                        image
                    )
                )
            `)
            .eq('id', inserted.id)
            .single();

        if (joinError) throw joinError;

        return fullPayment;

    } catch (error) {
        console.error(error);
    }
}

/**
 * 🔹 UPDATE PAYMENT
 */
export const updatePayment = async (id, form, agency_id) => {
    try {

        // 🔹 1. Actualizar pago base
        const { data: updated, error } = await clientDB
            .from("payments")
            .update({
                amount: form.amount,
                method: form.method,
                reference: form.reference,
                status: form.status,
                paid_at: form.paid_at,
                type: form.type || null
            })
            .eq("id", id)
            .eq("agency_id", agency_id)
            .select()
            .single();

        if (error) throw error;

        const bookingId = updated.booking_id;

        // 🔹 2. Obtener TODOS los pagos de ese booking
        const { data: payments, error: payError } = await clientDB
            .from("payments")
            .select("amount")
            .eq("booking_id", bookingId);

        if (payError) throw payError;

        const totalPaid = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);

        // 🔹 3. Obtener booking
        const { data: booking, error: bookingError } = await clientDB
            .from("bookings")
            .select("total")
            .eq("id", bookingId)
            .single();

        if (bookingError) throw bookingError;

        const totalBooking = Number(booking.total || 0);

        // 🔹 4. Recalcular
        const remaining = totalBooking - totalPaid;
        const is_partial = remaining > 0;
        const newStatus = remaining <= 0 ? "paid" : "partial";

        // 🔹 5. Actualizar TODOS los pagos de ese booking (consistencia)
        await clientDB
            .from("payments")
            .update({
                remaining,
                is_partial,
                status: newStatus
            })
            .eq("booking_id", bookingId);

        // 🔹 6. Retornar actualizado con JOIN (como tu formato actual)
        const { data: fullPayment, error: joinError } = await clientDB
            .from("payments")
            .select(`
                *,
                clients (
                    id,
                    name,
                    email,
                    phone
                ),
                bookings (
                    id,
                    total,
                    pax,
                    status,
                    packages (
                        id,
                        name,
                        price
                    )
                )
            `)
            .eq("id", id)
            .single();

        if (joinError) throw joinError;

        return fullPayment;

    } catch (error) {
        console.error(error);
        throw error;
    }
};