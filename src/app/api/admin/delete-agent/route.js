import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
    try {
        const { id } = await req.json();

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // 🔹 1. Eliminar de AUTH
        const { error: authError } = await supabase.auth.admin.deleteUser(id);

        if (authError) throw authError;

        // 🔹 2. Eliminar de tabla users
        const { error: dbError } = await supabase
            .from("users")
            .delete()
            .eq("id", id);

        if (dbError) throw dbError;

        return Response.json({ ok: true });

    } catch (error) {
        return Response.json(
            { ok: false, error: error.message },
            { status: 500 }
        );
    }
}