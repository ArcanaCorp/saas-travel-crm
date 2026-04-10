import { clientDB } from "@/libs/supabase";

export const createPackage = async (payload) => {

    const { data, error } = await clientDB
        .from("packages")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;

    return data;
};

export const getPackages = async (agency_id) => {

    const { data, error } = await clientDB
        .from("packages")
        .select("*")
        .eq("agency_id", agency_id)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
};

export const updatePackage = async (id, payload) => {

    const { data, error } = await clientDB
        .from("packages")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
};

export const deletePackage = async (id) => {

    const { error } = await clientDB
        .from("packages")
        .delete()
        .eq("id", id);

    if (error) throw error;
};