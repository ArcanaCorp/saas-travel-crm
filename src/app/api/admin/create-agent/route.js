import { createClient } from "@supabase/supabase-js";

export async function POST(req) {

    const { email, password, name, phone, role, agency_id } = await req.json();

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY // 🔥 clave admin
    );

    // 🔐 crear usuario
    const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (authError) {
        return Response.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    // 🧩 insertar en tabla users
    const { error } = await supabase
        .from("users")
        .insert({
            id: userId,
            agency_id,
            name,
            email,
            phone,
            role
        });

    if (error) {
        return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true });
}