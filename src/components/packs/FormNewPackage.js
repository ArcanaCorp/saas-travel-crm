'use client';

import { useAuth } from "@/context/AuthContext";
import { createPackage } from "@/services/packages.service";
import { IconCamera, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import Switich from "../Switich";
import { useDashboard } from "@/context/DashboardContext";

export default function FormNewPackage ({ onClose }) {

    const { user } = useAuth();
    const { addPack } = useDashboard();

    const [ form, setForm ] = useState({
        name: '',
        description: '',
        type: '',
        price: '',
        duration: '',
        location: '',
        capacity: '',
        status: false,
        web: false
    })
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => { 
        const { name, value, type, checked } = e.target; 
        setForm({ ...form, [name]: type === "checkbox" ? checked : value }); 
    }

    const handleChangeStatus = () => setForm(prev => ({...prev, status: !form.status }))
    const handleChangeWeb = () => setForm(prev => ({...prev, web: !form.web }))

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) return toast.error("Solo puedes subir máximo 5 imágenes");
        setImages(files);
        setPreviews(
            files.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }))
        );
    }

    const handleRemoveImage = (index) => {
        URL.revokeObjectURL(previews[index].preview);
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    }

    const handleSubmmit = async () => {
        
        if (!form.name || !form.price) return toast.error('Completa los campos obligatorios.')
        
        try {

            setLoading(true);

            const payload = { 
                agency_id: user?.agency_id, 
                name: form.name, 
                description: form.description,
                type: form.type, 
                price: parseFloat(form.price), 
                duration: form.duration, 
                location: form.location,
                capacity: form.capacity ? parseInt(form.capacity) : null, 
                status: form.status ? "active" : "inactive",
                is_web: form.web 
            };

            const data = await createPackage(payload, images);
            addPack(data)
            toast.success('Se creó con éxito el paquete turístico')
            onClose();
        
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false);
        }
    }

    return (

        <>
            <div className="w bg-surface border rounded-md p-md" style={{"--w": "350px", "--mnw": "350px"}}>
                <div className="w-full flex items-center justify-between">
                    <h3>Nuevo paquete</h3>
                    <button className="center w h rounded-full" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={onClose}><IconX/></button>
                </div>
                <div className="w-full flex flex-col gap-md">
                    <div className="w-full flex flex-col gap-xs">
                        <label className="text-xs text-muted font-medium">Ingresa el nombre del paquete</label>
                        <input type="text" name="name" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ej: Laguna de Paca" onChange={handleChange} disabled={loading} />
                    </div>
                    <div className="w-full flex flex-col gap-xs">
                        <label className="text-xs text-muted font-medium">Descripción del paquete</label>
                        <input type="text" name="description" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ej: Visitaras la laguna..." onChange={handleChange} disabled={loading} />
                    </div>
                    <div className="w-full flex flex-col gap-xs">
                        <label className="text-xs text-muted font-medium">Selecciona el tipo de paquete</label>
                        <select name="type" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} onChange={handleChange} disabled={loading}>
                            <option value={''} hidden>Selecciona el tipo de paquete</option>
                            <option value={'Aventura'}>Aventura</option>
                            <option value={'Paisaje'}>Paisaje</option>
                            <option value={'Tradicional'}>Tradicional</option>
                            <option value={'Gastronómico'}>Gastronómico</option>
                        </select>
                    </div>
                    <div className="w-full flex gap-xs items-center">
                        <div className="w-full flex flex-col gap-xs">
                            <label className="text-xs text-muted font-medium">Precio base del paquete</label>
                            <input type="text" name="price" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ej: 10.00" onChange={handleChange} disabled={loading} />
                        </div>
                        <div className="w-full flex flex-col gap-xs">
                            <label className="text-xs text-muted font-medium">Duración del paquete</label>
                            <input type="text" name="duration" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ej: 1 día o 8 horas" onChange={handleChange} disabled={loading} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-xs">
                        <label className="text-xs text-muted font-medium">Ingresa la ubicación del paquete</label>
                        <input type="text" name="location" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ej: Paca, Jauja" onChange={handleChange} disabled={loading} />
                    </div>
                    <div className="w-full flex flex-col gap-xs">
                        <label className="text-xs text-muted font-medium">Ingresa la capacidad máxima de personas</label>
                        <input type="text" name="capacity" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ej: 10" onChange={handleChange} disabled={loading} />
                    </div>
                    <div className="w-full flex items-center gap-xs justify-between">
                        <label htmlFor="status-package" className="flex items-center gap-xs text-xs text-muted font-medium">Mostrar Activo</label>
                        <Switich active={form.status} onChange={handleChangeStatus} />
                    </div>
                    {user?.page && (
                        <div className="w-full flex items-center gap-xs justify-between">
                            <label htmlFor="status-package" className="flex items-center gap-xs text-xs text-muted font-medium">Mostrar en página web</label>
                            <Switich active={form.web} onChange={handleChangeWeb} />
                        </div>
                    )}
                    <div className="w-full">
                        <span className="block text-xs text-muted font-medium mb-sm">Selecciona las imagenes del paquete</span>
                        <div className="w-full flex gap-xs flex-wrap">
                            <label htmlFor="imagesPack" className="w h center pointer bg-neutral rounded-md" style={{"--w": "120px", "--mnw": "120px", "--h": "120px"}}><IconCamera/></label>
                            {previews.map((img, index) => (
                                <div key={index} className="relative w h rounded-md overflow-hidden border" style={{"--w": "120px", "--mnw": "120px", "--h": "120px"}}>
                                    <img src={img.preview} className="w-full h-full" />
                                    <button className="absolute w h center inset bg-error text-inverse" style={{"--w": "30px", "--h": "30px", "--mnw": "30px"}} onClick={() => handleRemoveImage(index)}><IconX size={18} /></button>
                                </div>
                            ))}
                        </div>
                        <input type="file" id="imagesPack" name="imagesPack" accept="image/*" multiple hidden  onChange={handleImages}/>
                    </div>
                    <div className="w-full">
                        <button className="w-full h rounded-md bg-primary text-inverse bg-primary-hover" style={{"--h": "48px"}} disabled={loading} onClick={handleSubmmit}>{loading ? 'Creando...' : 'Crear nuevo paquete'}</button>
                    </div>
                </div>
            </div>
        </>

    )

}