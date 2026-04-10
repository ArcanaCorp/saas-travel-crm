'use client';
import { useAuth } from "@/context/AuthContext";
import { updateAgency } from "@/services/agencies.service";
import { IconCamera } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormUpdateAgency () {

    const { user } = useAuth();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        ruc: "",
        email: "",
        phone: "",
        direction: "",
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (user?.agency) {
        setForm({
            name: user.agency.name || "",
            ruc: user.agency.ruc || "",
            email: user.agency.email || "",
            phone: user.agency.phone || "",
            direction: user.agency.direction || "",
        });
        setImagePreview(user.agency.image || null);
    }

    }, [user]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    // 🖼 preview imagen
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setImageFile(file);
        setImagePreview(preview);
    };

    // 💾 guardar cambios
    const handleSave = async () => {
        try {
            setLoading(true);
            // TODO: subir imagen + update agency
            await updateAgency(user?.agency_id, form, imageFile)
            setIsEditing(false);
            toast.success('Éxito', { description: 'Se actualizó el perfil correctamente.' })
        } catch (err) {
            console.error(err);
            toast.error('Error', { description: err.message })
        } finally {
            setLoading(false);
            router.refresh();
        }
    };

    return (

        <>
            <div className="w-full flex items-center justify-between mb-md">
                <h3>Configuración de la Agencia</h3>
                <button className="px-md py-sm bg-none text-brand font-medium" onClick={() => isEditing ? handleSave() : setIsEditing(true)} disabled={loading}>{loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Editar negocio"}</button>
            </div>
            <div className="w-full flex gap-md">
                <label htmlFor="avatarAgency" className="relative block w h rounded-md bg-neutral border overflow-hidden" style={{"--w": "180px", "--h": "180px", "--mnw": "180px"}}>
                    {imagePreview ? ( <img src={imagePreview} alt="preview" className="w-full h-full object-cover" /> ) : null}
                    {isEditing && (
                        <>
                            <input type="file" id="avatarAgency" className="none" accept="image/*" onChange={handleImageChange} />
                            <div className="absolute center w h rounded-sm bg-surface" style={{"--w": "35px", "--mnw": "35px", "--h": "35px", "bottom": "8px", "right": "8px"}}><IconCamera/></div>
                        </>
                    )}
                </label>
                <div className="w-full flex flex-col gap-md">
                    <div className="w-full flex gap-md">
                        <div className="w-full">
                            <label className="block text-muted text-xs uppercase font-medium mb-sm">Nombre de la Empresa</label>
                            <input type="text" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} name="name" value={form.name} onChange={handleChange} placeholder={user?.agency.name || "Ingresa nombre de la empresa"} readOnly={!isEditing} />
                        </div>
                        <div className="w-full">
                            <label className="block text-muted text-xs uppercase font-medium mb-sm">RUC</label>
                            <input type="text" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} name="ruc" value={form.ruc} onChange={handleChange} placeholder={user?.agency.ruc || "Ingresa RUC de la empresa"} readOnly={!isEditing} />
                        </div>
                    </div>
                    <div className="w-full flex gap-md">
                        <div className="w-full">
                            <label className="block text-muted text-xs uppercase font-medium mb-sm">Correo Electrónico</label>
                            <input type="text" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} name="email" value={form.email} onChange={handleChange} placeholder={user?.agency.email || "Ingresa correo de la empresa"} readOnly={!isEditing} />
                        </div>
                        <div className="w-full">
                            <label className="block text-muted text-xs uppercase font-medium mb-sm">Número Telefónico</label>
                            <input type="text" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} name="phone" value={form.phone} onChange={handleChange} placeholder={user?.agency.phone || "Ingresa número de la empresa"} readOnly={!isEditing} />
                        </div>
                    </div>
                    <div className="w-full flex gap-md">
                        <div className="w-full">
                            <label className="block text-muted text-xs uppercase font-medium mb-sm">Dirección de la Empresa</label>
                            <input type="text" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} name="direction" value={form.direction} onChange={handleChange} placeholder={user?.agency.direction || "Ingresa dirección de la empresa"} readOnly={!isEditing} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}