import { clientDB } from "@/libs/supabase";

export const getAgents = async (agency_id) => {

    const { data, error } = await clientDB
        .from("users")
        .select("*")
        .eq("agency_id", agency_id)
        .eq("role", "agent")
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
};

export const getUserStats = async (agency_id) => {
    try {

        // 🔹 1. TOTAL AGENTES
        const { count: totalAgents } = await clientDB
            .from("users")
            .select("*", { count: "exact", head: true })
            .eq("agency_id", agency_id)
            .eq("role", "agent");

        // 🔹 2. ROLES ACTIVOS
        const { data: rolesData } = await clientDB
            .from("users")
            .select("role")
            .eq("agency_id", agency_id);

        const uniqueRoles = [...new Set(rolesData?.map(r => r.role))];

        // 🔹 3. LEADS SIN ASIGNAR (requiere tabla leads)
        let unassignedLeads = 0;

        const { count: leadsCount } = await clientDB
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("agency_id", agency_id)
            .is("agent_id", null);

        unassignedLeads = leadsCount || 0;

        // 🔹 4. CONVERSIÓN (simple MVP)
        const { count: totalLeads } = await clientDB
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("agency_id", agency_id);

        const { count: convertedLeads } = await clientDB
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("agency_id", agency_id)
            .eq("status", "won");

        const conversionRate = totalLeads
            ? ((convertedLeads / totalLeads) * 100).toFixed(1)
            : 0;

        return {
            totalAgents: totalAgents || 0,
            unassignedLeads,
            conversionRate,
            rolesCount: uniqueRoles.length,
            roles: uniqueRoles,
        };

    } catch (error) {
        console.error(error);
        throw error;
    }
};