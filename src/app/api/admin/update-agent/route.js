import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
    try {
        const body = await req.json();
        const { id, email, password, name, phone, role } = body;

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // 🔹 1. UPDATE AUTH (usuario real)
        if (email || password) {
            const { error: authError } = await supabase.auth.admin.updateUserById(id, {
                email,
                password
            });

            if (authError) throw authError;
        }

        // 🔹 2. UPDATE TABLA users
        const { data, error } = await supabase
            .from("users")
            .update({
                name,
                phone,
                email,
                role
            })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return Response.json({ ok: true, data });

    } catch (error) {
        return Response.json({ ok: false, error: error.message }, { status: 500 });
    }
}