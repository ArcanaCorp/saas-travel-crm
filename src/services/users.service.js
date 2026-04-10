import { clientDB } from "@/libs/supabase";

export const getAgents = async (agency_id) => {

    const { data, error } = await clientDB
        .from("users")
        .select("*")
        .eq("agency_id", agency_id)
        .neq("role", "admin")
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
};

export const createNewAgent = async (form, agency_id) => {
    try {
        const res = await fetch("/api/admin/create-agent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
                name: form.name,
                phone: form.phone,
                role: form.role,
                agency_id: agency_id,
            }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return { ok: true, message: 'Se creó con éxito el agente', error: '', code: 200 }
    } catch (error) {
        console.error(error);
        return { ok: false, message: `Hubo un error: ${error.message}`, error: error, code: 200 }
    }
}

export const getUserStats = async (agency_id) => {
    try {

        // 🔹 1. TOTAL AGENTES
        const { count: totalAgents } = await clientDB
            .from("users")
            .select("*", { count: "exact", head: true })
            .eq("agency_id", agency_id)
            .neq("role", "admin");

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

export const updateAgent = async (id, form) => {
    const res = await fetch("/api/admin/update-agent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            ...form
        }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    return data;
};

export const deleteAgent = async (id) => {
    const res = await fetch("/api/admin/delete-agent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    return data;
};