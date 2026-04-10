'use client';

import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/services/profile.service";
import { IconCamera, IconEye, IconEyeClosed } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormUpdateProfile () {

    const { user } = useAuth();
    const router = useRouter();

    const [ isEditing, setIsEditing] = useState(false);
    const [ loading, setLoading] = useState(false);
    const [ viewPwd, setViewPwd ] = useState(false);
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    })
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                password: "",
            });

            setImagePreview(user.image || null);
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setImageFile(file);
        setImagePreview(preview);
    }

    const handleSave = async () => {
        try {
            setLoading(true);
            await updateProfile(user?.id, formData, imageFile)
            setIsEditing(false);
            toast.success('Éxito', { description: 'Se actualizó correctamente.' })
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
            router.refresh();
        }
    }

    const isGoogleUser = user?.app_metadata?.provider === "google";

    return (

        <>

            <div className="w-full flex items-center justify-between mb-md">
                <h3>Perfil del Usuario</h3>
                <button className="px-md py-sm bg-none text-brand font-medium" onClick={() => isEditing ? handleSave() : setIsEditing(true)} disabled={loading}>{loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Editar perfil"}</button>
            </div>

            <div className="w-full flex gap-md">
                <label htmlFor="avatarProfile" className="relative block w h rounded-md bg-neutral border overflow-hidden" style={{"--w": "180px", "--h": "180px", "--mnw": "180px"}}>
                    {imagePreview ? ( <img src={imagePreview} alt="preview" className="w-full h-full object-cover" /> ) : null}
                    {isEditing && (
                        <>
                            <input type="file" id="avatarProfile" accept="image/*" hidden onChange={handleImageChange}/>
                            <div className="absolute center w h rounded-sm bg-surface" style={{"--w": "35px", "--mnw": "35px", "--h": "35px", "bottom": "8px", "right": "8px"}}><IconCamera/></div>
                        </>
                    )}
                </label>
                <div className="w-full flex flex-col gap-md">
                    <div className="w-full flex gap-md">
                        <div className="w-full">
                            <label className="block text-muted text-xs uppercase font-medium mb-sm">Nombre Completo</label>
                            <input type="text" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ingresa nombre de usuario" name="name" value={formData.name} onChange={handleChange} readOnly={!isEditing} />
                        </div>
                    </div>
                    <div className="w-full flex gap-md">
                        <div className="w-full">
                            <label className="block text-muted text-xs uppercase font-medium mb-sm">Número de usuario</label>
                            <input type="text" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ingresa número de usuario" name="phone" value={formData.phone} onChange={handleChange} readOnly={!isEditing} />
                        </div>
                        <div className="w-full">
                            <label className="block text-muted text-xs uppercase font-medium mb-sm">Correo Electrónico</label>
                            <input type="text" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder={user?.email || 'Ingresa correo de usuario'} name="email" value={formData.email} onChange={handleChange} readOnly={isGoogleUser || !isEditing} />
                        </div>
                    </div>
                    {!isGoogleUser && (
                        <div className="w-full flex gap-md">
                            <div className="w-full">
                                <label className="block text-muted text-xs uppercase font-medium mb-sm">Cambiar contraseña</label>
                                <div className="relative w-full">
                                    <input type={viewPwd ? 'text' : 'password'} className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder={'Cambiar contraseña'} name="password" value={formData.password} onChange={handleChange} readOnly={!isEditing} />
                                    <span className="absolute center w h" style={{"--w": "48px", "--h": "48px", top: '0', right: '0'}} onClick={() => setViewPwd(!viewPwd)}>{viewPwd ? <IconEyeClosed/> : <IconEye/>}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        
        </>

    )

}