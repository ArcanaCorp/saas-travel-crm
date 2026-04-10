'use client';

import { useAuth } from "@/context/AuthContext";
import { createPackage } from "@/services/packages.service";
import { useState } from "react";
import { toast } from "sonner";

export default function FormNewPackage ({ handleToogle, refresh }) {

    const { user } = useAuth();

    const [ form, setForm ] = useState({
        name: '',
        description: '',
        type: '',
        price: '',
        duration: '',
        location: '',
        capacity: '',
        status: false
    })
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => { 
        const { name, value, type, checked } = e.target; 
        setForm({ ...form, [name]: type === "checkbox" ? checked : value }); 
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
            };

            await createPackage(payload);
            handleToogle();
            await refresh();

            toast.success('Se creó con éxito el paquete turístico')
        
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false);
        }
    }

    return (

        <>
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
                <div className="w-full flex flex-col gap-xs">
                    <label className="text-xs text-muted font-medium">Ingresa el precio base del paquete</label>
                    <input type="text" name="price" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ej: 10.00" onChange={handleChange} disabled={loading} />
                </div>
                <div className="w-full flex flex-col gap-xs">
                    <label className="text-xs text-muted font-medium">Ingresa la duración del paquete</label>
                    <input type="text" name="duration" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ej: 1 día o 8 horas" onChange={handleChange} disabled={loading} />
                </div>
                <div className="w-full flex flex-col gap-xs">
                    <label className="text-xs text-muted font-medium">Ingresa la ubicación del paquete</label>
                    <input type="text" name="location" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ej: Paca, Jauja" onChange={handleChange} disabled={loading} />
                </div>
                <div className="w-full flex flex-col gap-xs">
                    <label className="text-xs text-muted font-medium">Ingresa la capacidad máxima de personas</label>
                    <input type="text" name="capacity" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ej: 10" onChange={handleChange} disabled={loading} />
                </div>
                <div className="w-full flex flex-col gap-xs">
                    <label htmlFor="status-package" className="flex items-center gap-xs text-xs text-muted font-medium"><input type="checkbox" name="status" id="status-package" checked={form.status} onChange={handleChange} disabled={loading} /> Activo</label>
                </div>
                <div className="w-full">
                    <button className="w-full h rounded-md bg-primary text-inverse bg-primary-hover" style={{"--h": "48px"}} disabled={loading} onClick={handleSubmmit}>{loading ? 'Creando...' : 'Crear nuevo paquete'}</button>
                </div>
            </div>
        </>

    )

}