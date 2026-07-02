import { clientDB } from "@/libs/supabase";

const PACKAGE_BUCKET = "package";

const normalizeGalleryImages = (galleryImages) => {
    if (!galleryImages) return [];
    if (Array.isArray(galleryImages)) return galleryImages;
    return [];
};

const getStoragePathFromPublicUrl = (url) => {
    if (!url) return null;

    const marker = `/storage/v1/object/public/${PACKAGE_BUCKET}/`;
    const index = url.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(url.slice(index + marker.length));
};

const getUniqueUrls = (urls = []) => {
    return [...new Set(urls.filter(Boolean))];
};

export const uploadPackageImages = async (agencyId, packageId, files = []) => {
    if (!files || files.length === 0) return [];

    const urls = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const ext = file.name.split(".").pop();
        const random = crypto.randomUUID() + "_" + Date.now();

        const path = `${agencyId}/pack_${packageId}/${random}.${ext}`;

        const { error } = await clientDB.storage
            .from(PACKAGE_BUCKET)
            .upload(path, file);

        if (error) throw error;

        const { data } = clientDB.storage
            .from(PACKAGE_BUCKET)
            .getPublicUrl(path);

        urls.push(data.publicUrl);
    }

    return urls;
};

export const removePackageImagesFromStorage = async (imageUrls = []) => {
    const paths = getUniqueUrls(imageUrls)
        .map(url => getStoragePathFromPublicUrl(url))
        .filter(Boolean);

    if (paths.length === 0) return;

    const { error } = await clientDB.storage
        .from(PACKAGE_BUCKET)
        .remove(paths);

    if (error) throw error;
};

export const createPackage = async (payload, images = []) => {
    const { data: createdPackage, error } = await clientDB
        .from("packages")
        .insert({
            ...payload,
            cover_image: null,
            gallery_images: []
        })
        .select()
        .single();

    if (error) throw error;

    if (!images || images.length === 0) {
        return createdPackage;
    }

    const galleryImages = await uploadPackageImages(
        payload.agency_id,
        createdPackage.id,
        images
    );

    const { data: updatedPackage, error: updateError } = await clientDB
        .from("packages")
        .update({
            cover_image: galleryImages[0] || null,
            gallery_images: galleryImages
        })
        .eq("id", createdPackage.id)
        .select()
        .single();

    if (updateError) throw updateError;

    return updatedPackage;
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

export const updatePackageWithImages = async ({
    packageId,
    agencyId,
    payload,
    existingImages = [],
    newImages = [],
    removedImages = []
}) => {
    const uploadedImages = await uploadPackageImages(
        agencyId,
        packageId,
        newImages
    );

    const galleryImages = getUniqueUrls([
        ...existingImages,
        ...uploadedImages
    ]);

    const updatedPayload = {
        ...payload,
        cover_image: galleryImages[0] || null,
        gallery_images: galleryImages
    };

    const updatedPackage = await updatePackage(packageId, updatedPayload);

    if (removedImages.length > 0) {
        await removePackageImagesFromStorage(removedImages);
    }

    return updatedPackage;
};

export const deletePackage = async (id) => {
    const { data: pack, error: getError } = await clientDB
        .from("packages")
        .select("id, cover_image, gallery_images")
        .eq("id", id)
        .single();

    if (getError) throw getError;

    const galleryImages = normalizeGalleryImages(pack.gallery_images);

    const imagesToRemove = galleryImages.length > 0
        ? galleryImages
        : pack.cover_image
            ? [pack.cover_image]
            : [];

    const { error } = await clientDB
        .from("packages")
        .delete()
        .eq("id", id);

    if (error) throw error;

    await removePackageImagesFromStorage(imagesToRemove);
};