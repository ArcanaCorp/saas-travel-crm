'use client';

import { useAuth } from "@/context/AuthContext";
import { updatePackageWithImages } from "@/services/packages.service";
import { IconCamera, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import Switich from "../Switich";
import { toast } from "sonner";
import { useDashboard } from "@/context/DashboardContext";

const MAX_IMAGES = 5;

export default function FormEditPackage({ pack, close }) {
    const { user } = useAuth();
    const { updatePack } = useDashboard();

    const localUrlsRef = useRef([]);

    const [form, setForm] = useState({
        name: '',
        description: '',
        type: '',
        price: '',
        duration: '',
        location: '',
        capacity: '',
        status: false,
        web: false
    });

    const [previews, setPreviews] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const cleanLocalUrls = () => {
        localUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
        localUrlsRef.current = [];
    };

    const getGalleryFromPack = (pack) => {
        const gallery = Array.isArray(pack?.gallery_images)
            ? pack.gallery_images
            : [];

        if (gallery.length > 0) {
            if (pack?.cover_image) {
                return [
                    pack.cover_image,
                    ...gallery.filter(url => url !== pack.cover_image)
                ];
            }

            return gallery;
        }

        return pack?.cover_image ? [pack.cover_image] : [];
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleChangeStatus = () => {
        setForm(prev => ({
            ...prev,
            status: !prev.status
        }));
    };

    const handleChangeWeb = () => {
        setForm(prev => ({
            ...prev,
            web: !prev.web
        }));
    };

    const handleImages = (e) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) return;

        const totalImages = previews.length + files.length;

        if (totalImages > MAX_IMAGES) {
            toast.error(`Solo puedes tener máximo ${MAX_IMAGES} imágenes`);
            e.target.value = "";
            return;
        }

        const newPreviews = files.map(file => {
            const preview = URL.createObjectURL(file);

            localUrlsRef.current.push(preview);

            return {
                id: crypto.randomUUID(),
                preview,
                file,
                image_url: null,
                isNew: true
            };
        });

        setPreviews(prev => [...prev, ...newPreviews]);

        e.target.value = "";
    };

    const handleRemoveImage = (index) => {
        const imageToRemove = previews[index];

        if (!imageToRemove) return;

        if (imageToRemove.isNew) {
            URL.revokeObjectURL(imageToRemove.preview);

            localUrlsRef.current = localUrlsRef.current.filter(
                url => url !== imageToRemove.preview
            );
        } else {
            setRemovedImages(prev => [
                ...prev,
                imageToRemove.image_url
            ]);
        }

        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        if (!form.name.trim()) return "Ingresa el nombre del paquete";
        if (!form.description.trim()) return "Ingresa la descripción del paquete";
        if (!form.type) return "Selecciona el tipo de paquete";
        if (!form.price) return "Ingresa el precio del paquete";
        if (!form.duration.trim()) return "Ingresa la duración del paquete";
        if (!form.location.trim()) return "Ingresa la ubicación del paquete";
        if (!form.capacity) return "Ingresa la capacidad máxima";

        if (Number.isNaN(Number(form.price)) || Number(form.price) < 0) {
            return "El precio debe ser válido";
        }

        if (Number.isNaN(Number(form.capacity)) || Number(form.capacity) <= 0) {
            return "La capacidad debe ser válida";
        }

        return null;
    };

    const handleSubmit = async () => {
        if (!pack?.id) {
            toast.error("No se encontró el paquete");
            return;
        }

        const errorMessage = validateForm();

        if (errorMessage) {
            toast.error(errorMessage);
            return;
        }

        setLoading(true);

        try {
            const existingImages = previews
                .filter(img => !img.isNew)
                .map(img => img.image_url)
                .filter(Boolean);

            const newImages = previews
                .filter(img => img.isNew)
                .map(img => img.file)
                .filter(Boolean);

            const payload = {
                name: form.name.trim(),
                description: form.description.trim(),
                type: form.type,
                price: Number(form.price),
                duration: form.duration.trim(),
                location: form.location.trim(),
                capacity: Number(form.capacity),
                status: form.status ? "active" : "inactive",
                is_web: form.web
            };

            const updatedPackage = await updatePackageWithImages({
                packageId: pack.id,
                agencyId: pack.agency_id,
                payload,
                existingImages,
                newImages,
                removedImages
            });

            toast.success("Paquete actualizado correctamente");
            updatePack(updatedPackage)            
            close?.();

        } catch (error) {
            console.error(error);
            toast.error(error.message || "No se pudo actualizar el paquete");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!pack) return;

        cleanLocalUrls();

        const galleryImages = getGalleryFromPack(pack);

        setForm({
            name: pack.name ?? '',
            description: pack.description ?? '',
            type: pack.type ?? '',
            price: pack.price?.toString() ?? '',
            duration: pack.duration ?? '',
            location: pack.location ?? '',
            capacity: pack.capacity?.toString() ?? '',
            status: pack.status === "active" || pack.status === true,
            web: Boolean(pack.is_web)
        });

        setRemovedImages([]);

        setPreviews(
            galleryImages.map((url, index) => ({
                id: `${url}-${index}`,
                preview: url,
                image_url: url,
                isNew: false
            }))
        );
    }, [pack]);

    useEffect(() => {
        return () => {
            cleanLocalUrls();
        };
    }, []);

    return (
        <div className="w bg-surface border rounded-md p-md" style={{ "--w": "350px", "--mnw": "350px" }}>
            <div className="w-full flex items-center justify-between">
                <h3>Editar Paquete</h3>

                <button
                    type="button"
                    className="center w h rounded-full"
                    style={{ "--w": "40px", "--mnw": "40px", "--h": "40px" }}
                    onClick={close}
                    disabled={loading}
                >
                    <IconX size={18} />
                </button>
            </div>

            <div className="w-full flex flex-col gap-md">
                <div className="w-full flex flex-col gap-xs">
                    <label className="text-xs text-muted font-medium">Ingresa el nombre del paquete</label>
                    <input
                        type="text"
                        name="name"
                        className="input"
                        value={form.name}
                        placeholder="Ej: Laguna de Paca"
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="w-full flex flex-col gap-xs">
                    <label className="text-xs text-muted font-medium">Descripción del paquete</label>
                    <input
                        type="text"
                        name="description"
                        className="input"
                        value={form.description}
                        placeholder="Ej: Visitaras la laguna..."
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="w-full flex flex-col gap-xs">
                    <label className="text-xs text-muted font-medium">Selecciona el tipo de paquete</label>
                    <select
                        name="type"
                        className="input"
                        value={form.type}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        <option value="" hidden>Selecciona el tipo de paquete</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Paisaje">Paisaje</option>
                        <option value="Tradicional">Tradicional</option>
                        <option value="Gastronómico">Gastronómico</option>
                    </select>
                </div>

                <div className="w-full flex gap-xs items-center">
                    <div className="w-full flex flex-col gap-xs">
                        <label className="text-xs text-muted font-medium">Precio base del paquete</label>
                        <input
                            type="number"
                            name="price"
                            className="input"
                            value={form.price}
                            placeholder="Ej: 10.00"
                            onChange={handleChange}
                            disabled={loading}
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-xs">
                        <label className="text-xs text-muted font-medium">Duración del paquete</label>
                        <input
                            type="text"
                            name="duration"
                            className="input"
                            value={form.duration}
                            placeholder="Ej: 1 día o 8 horas"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-xs">
                    <label className="text-xs text-muted font-medium">Ingresa la ubicación del paquete</label>
                    <input
                        type="text"
                        name="location"
                        className="input"
                        value={form.location}
                        placeholder="Ej: Paca, Jauja"
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="w-full flex flex-col gap-xs">
                    <label className="text-xs text-muted font-medium">Ingresa la capacidad máxima de personas</label>
                    <input
                        type="number"
                        name="capacity"
                        className="input"
                        value={form.capacity}
                        placeholder="Ej: 10"
                        onChange={handleChange}
                        disabled={loading}
                        min="1"
                    />
                </div>

                <div className="w-full flex items-center gap-xs justify-between">
                    <label className="flex items-center gap-xs text-xs text-muted font-medium">
                        Mostrar Activo
                    </label>
                    <Switich active={form.status} onChange={handleChangeStatus} />
                </div>

                {user?.page && (
                    <div className="w-full flex items-center gap-xs justify-between">
                        <label className="flex items-center gap-xs text-xs text-muted font-medium">
                            Mostrar en página web
                        </label>
                        <Switich active={form.web} onChange={handleChangeWeb} />
                    </div>
                )}

                <div className="w-full">
                    <span className="block text-xs text-muted font-medium mb-sm">
                        Selecciona las imagenes del paquete
                    </span>

                    <div className="w-full flex gap-xs flex-wrap">
                        {previews.length < MAX_IMAGES && (
                            <label
                                htmlFor="imagesPack"
                                className="w h center pointer bg-neutral rounded-md"
                                style={{ "--w": "120px", "--mnw": "120px", "--h": "120px" }}
                            >
                                <IconCamera />
                            </label>
                        )}

                        {previews.map((img, index) => (
                            <div
                                key={img.id}
                                className="relative w h rounded-md overflow-hidden border"
                                style={{ "--w": "120px", "--mnw": "120px", "--h": "120px" }}
                            >
                                <img
                                    src={img.preview}
                                    className="w-full h-full object-cover"
                                    alt={`Imagen ${index + 1}`}
                                />

                                {index === 0 && (
                                    <span className="absolute top-xs left-xs text-xs bg-primary text-inverse rounded-sm px-xs">
                                        Portada
                                    </span>
                                )}

                                <button
                                    type="button"
                                    className="absolute w h center inset bg-error text-inverse"
                                    style={{ "--w": "30px", "--h": "30px", "--mnw": "30px" }}
                                    onClick={() => handleRemoveImage(index)}
                                    disabled={loading}
                                >
                                    <IconX size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <input
                        type="file"
                        id="imagesPack"
                        name="imagesPack"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleImages}
                        disabled={loading}
                    />
                </div>

                <div className="w-full">
                    <button
                        type="button"
                        className="w-full h rounded-md bg-primary text-inverse bg-primary-hover"
                        style={{ "--h": "48px" }}
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? 'Editando...' : 'Editar paquete'}
                    </button>
                </div>
            </div>
        </div>
    );
}