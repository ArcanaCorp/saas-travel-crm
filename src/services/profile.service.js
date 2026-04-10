import { clientDB } from "@/libs/supabase";
import { uploadProfileImage } from "./upload.service";

export const updateProfile = async (userId, form, file) => {
    try {

        // 🔹 1. UPDATE AUTH (email / password)
        if (form.email || form.password) {
            const { error: authError } = await clientDB.auth.updateUser({
                email: form.email || undefined,
                password: form.password || undefined,
            });

            if (authError) throw authError;
        }

        // 🔹 2. SUBIR IMAGEN
        let imageUrl = null;

        if (file) {
            imageUrl = await uploadProfileImage(file, userId);
        }

        // 🔹 3. UPDATE TABLA users
        const payload = {
            name: form.name,
            phone: form.phone,
        };

        if (imageUrl) {
            payload.image = imageUrl;
        }

        const { data, error } = await clientDB
            .from("users")
            .update(payload)
            .eq("id", userId)
            .select()
            .single();

        if (error) throw error;

        return data;


    } catch (error) {
        console.error("updateProfile error:", error);
        throw error;
    }
};