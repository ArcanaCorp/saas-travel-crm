import { clientDB } from "@/libs/supabase";

export const uploadProfileImage = async (file, userId) => {

    if (!file) throw new Error("No file");

    const fileExt = file.name.split(".").pop();
    const fileName = `profile-${userId}-${Date.now()}.${fileExt}`;

    const { error } = await clientDB.storage
        .from("profiles") // puedes cambiar a "profiles" luego
        .upload(fileName, file, {
            upsert: true,
        });

    if (error) throw error;

    const { data } = clientDB.storage
        .from("profiles")
        .getPublicUrl(fileName);

    return data.publicUrl;
};

export const uploadAgencyImage = async (file, agencyId) => {
    try {
        // 📌 1. Validación básica
        if (!file) throw new Error("No file provided");

        // 📌 2. Generar nombre único (evita cache issues)
        const fileExt = file.name.split(".").pop();
        const fileName = `${agencyId}-${Date.now()}.${fileExt}`;

        // 📌 3. Subir al bucket
        const { error: uploadError } = await clientDB.storage
            .from("bussines")
            .upload(fileName, file, {
                cacheControl: "3600",
                upsert: true,
            });

        if (uploadError) throw uploadError;

        // 📌 4. Obtener URL pública
        const { data } = clientDB.storage
            .from("bussines")
            .getPublicUrl(fileName);

        return data.publicUrl;

    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export const uploadPackageImage = async (file, packageId) => {

    const ext = file.name.split(".").pop();
    const fileName = `package-${packageId}-${Date.now()}.${ext}`;

    const { error } = await clientDB.storage
        .from("package")
        .upload(fileName, file, { upsert: true });

    if (error) throw error;

    const { data } = clientDB.storage
        .from("package")
        .getPublicUrl(fileName);

    return data.publicUrl;
};