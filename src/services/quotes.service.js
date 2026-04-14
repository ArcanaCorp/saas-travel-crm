import { clientDB } from "@/libs/supabase";
import { createClient } from "./client.service";

/**
 * 🔹 GET ALL QUOTES (por agencia)
 */
export const getQuotes = async (agency_id) => {

    const { data, error } = await clientDB
        .from('quotes')
        .select(`
            *,
            clients!inner (
                id,
                name,
                phone,
                email
            ),
            packages!inner (
                *
            )
        `)
        .eq('agency_id', agency_id)
        .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
};

/**
 * 🔹 CREATE QUOTES (por agencia)
 */
export const createQuote = async (form, agency_id) => {

    let clientId = null;

    if (form.clientId === 'create') {

        const newClient = await createClient({
            name: form.clientName,
            phone: form.clientNumber,
            email: null,
            source: 'Cotización',
            location: 'Perú'
        }, agency_id);

        clientId = newClient.id;

    } else {
        clientId = form.clientId;
    }

    const { data: pkg } = await clientDB
        .from("packages")
        .select("price")
        .eq("id", form.destination)
        .single();

    const total = pkg.price * form.pax;

    const { data: inserted, error } = await clientDB
        .from("quotes")
        .insert([
            {
                agency_id,
                client_id: clientId, // 🔥 ahora usamos ID real
                package_id: form.destination, // luego puedes normalizar también
                travel_date: form.travelDate,
                pax: form.pax,
                total
            }
        ])
        .select("id")
        .single();

    if (error) throw error;

    // 🔥 4. TRAER DATA COMPLETA CON JOIN
    const { data: fullQuote, error: joinError } = await clientDB
        .from("quotes")
        .select(`
            *,
            clients (
                id,
                name,
                email,
                phone
            ),
            packages (
                id,
                name,
                type,
                price,
                image
            )
        `)
        .eq("id", inserted.id)
        .single();

    if (joinError) throw joinError;

    return fullQuote;
};

/**
 * 🔹 UPDATE QUOTE
 */
export const updateQuote = async (id, form, agency_id) => {

    // 🔹 1. Recalcular total si cambia paquete o pax
    let total = null;

    if (form.package_id || form.pax) {

        const { data: pkg, error: pkgError } = await clientDB
            .from("packages")
            .select("price")
            .eq("id", form.package_id)
            .single();

        if (pkgError) throw pkgError;

        total = pkg.price * form.pax;
    }

    // 🔹 2. Actualizar
    const { error } = await clientDB
        .from("quotes")
        .update({
            ...form,
            ...(total !== null && { total })
        })
        .eq("id", id)
        .eq("agency_id", agency_id);

    if (error) throw error;

    // 🔥 3. DEVOLVER CON JOIN (igual que create)
    const { data, error: joinError } = await clientDB
        .from("quotes")
        .select(`
            *,
            clients (
                id,
                name,
                email,
                phone
            ),
            packages (
                id,
                name,
                type,
                price,
                image
            )
        `)
        .eq("id", id)
        .single();

    if (joinError) throw joinError;

    return data;
};

/**
 * 🔹 DELETE QUOTE
 */
export const deleteQuote = async (id, agency_id) => {

    const { error } = await clientDB
        .from("quotes")
        .delete()
        .eq("id", id)
        .eq("agency_id", agency_id);

    if (error) throw error;

    return {
        ok: true,
        id
    };
};