import { clientDB } from "@/libs/supabase";

/**
 * 🔹 CREATE CLIENT
 */
export const createClient = async (form, agency_id) => {

    const payload = {
        agency_id,
        name: form.name?.trim(),
        email: form.email?.trim(),
        phone: form.phone?.trim(),
        source: form.source || null,
        location: form.location?.trim(),
        status: 'new'
    };

    const { data, error } = await clientDB
        .from('clients')
        .insert([payload])
        .select()
        .single();

    if (error) throw error;

    return data;
};

/**
 * 🔹 GET ALL CLIENTS (por agencia)
 */
export const getClients = async (agency_id) => {

    const { data, error } = await clientDB
        .from('clients')
        .select('*')
        .eq('agency_id', agency_id)
        .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
};

/**
 * 🔹 UPDATE CLIENT
 */
export const updateClient = async (id, form, agency_id) => {

    const payload = {
        name: form.name?.trim(),
        email: form.email?.trim(),
        phone: form.phone?.trim(),
        source: form.source || null,
        location: form.location?.trim(),
        status: form.status || 'new'
    };

    const { data, error } = await clientDB
        .from('clients')
        .update(payload)
        .eq('id', id)
        .eq('agency_id', agency_id)
        .select()
        .single();

    if (error) throw error;

    return data;
};

/**
 * 🔹 DELETE CLIENT
 */
export const deleteClient = async (id, agency_id) => {

    const { error } = await clientDB
        .from('clients')
        .delete()
        .eq('id', id)
        .eq('agency_id', agency_id);

    if (error) throw error;

    return true;
};