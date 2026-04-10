import { clientDB } from "@/libs/supabase";
import { uploadAgencyImage } from "./upload.service";


export const setupNewUser = async (user) => {
    
    // 🏢 Crear agencia
    const { data: agency } = await clientDB
        .from("agencies")
        .insert([
            {
                email: user.email,
            },
        ])
        .select()
        .single();
    
    // 👤 Crear usuario extendido
    await clientDB.from("users").insert([
        {
            id: user.id,
            agency_id: agency.id,
            role: "admin",
            plan: "free",
        },
    ]);
};

export const updateAgency = async (id, form, file) => {

    const payload = {
        name: form.name,
        ruc: form.ruc,
        email: form.email,
        phone: form.phone,
        direction: form.direction
    };

    if (file) {
        const imageURL = await uploadAgencyImage(file, id)
        payload.image = imageURL;
    }

    const { data, error } = await clientDB
        .from("agencies")
        .update(payload)
        .eq("id", id)
        .select()
        .single()

    if (error) throw error;

    return data;

}