import { clientDB } from "@/libs/supabase";

export const createPackage = async (payload, images = []) => {

    const { data, error } = await clientDB
        .from("packages")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;

    if (images.length > 0) {
        await uploadPackageImages(
            payload.agency_id,
            data.id,
            images
        );
    }

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

export const uploadPackageImages = async (agencyId, packageId, files) => {

    const inserted = [];

    for (let i = 0; i < files.length; i++) {

        const file = files[i];

        const ext = file.name.split(".").pop();

        const random = crypto.randomUUID() + "_" + Date.now();

        const path = `${agencyId}/pack_${packageId}/${random}.${ext}`;

        const { error } = await clientDB.storage
            .from("package")
            .upload(path, file);

        if (error) throw error;

        const { data: publicUrl } = clientDB.storage
            .from("package")
            .getPublicUrl(path);

        inserted.push({
            package_id: packageId,
            image_url: publicUrl.publicUrl,
            cover: i === 0
        });

    }

    const { error } = await clientDB
        .from("package_images")
        .insert(inserted);

    if (error) throw error;

};