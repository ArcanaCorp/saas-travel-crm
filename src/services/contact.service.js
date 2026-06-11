import { clientDB } from "@/libs/supabase";

export const getContacts = async (agencyId) => {
    try {
        
        const { data, error } = await clientDB
            .from('contact_landing')
            .select(`
                *,
                package (
                    *
                )    
            `)
            .eq('agency_id', agencyId)
        
        if (error) throw error;

        return data;

    } catch (error) {
        console.error(error);
    }
}