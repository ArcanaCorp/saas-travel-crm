'use client';
import { useAuth } from "@/context/AuthContext";
import { SOURCE_OPTIONS } from "@/helpers/formatter";
import { createClient } from "@/services/client.service";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FormNewClient ({ toggle, add }) {

    const { user } = useAuth();

    const [ form, setForm ] = useState({
        name: '',
        email: '',
        phone: '',
        source: '',
        location: '',
    })
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.name || !form.email || !form.phone) return toast.warning('Completa los campos antes de continuar.');

        try {
            
            setLoading(true)
            const data = await createClient(form, user?.agency_id);
            add(data);
            toast.success('Cliente creado con éxito');
            toggle();

        } catch (error) {
            console.error(error);
            toast.error('Error', { description: `Hubo un error: ${error.message}` })
        } finally {
            setLoading(false);
        }

    }

    return (

        <form className="w bg-surface border rounded-md p-md" style={{"--w": "400px", "--mnw": "400px"}} onSubmit={handleSubmit}>
            <div className="w-full flex items-center justify-between">
                <h3>Crear nuevo cliente</h3>
                <button className="center w h bg-neutral rounded-full" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={toggle}><IconX/></button>
            </div>
            <div className="w-full flex flex-col gap-md">
                <div className="w-full">
                    <label className="text-xs text-muted font-medium">Nombre del cliente</label>
                    <input type="text" name="name" id="name" className="input" placeholder="Ej: Juan Valdez" value={form.name} onChange={handleChange} disabled={loading} />
                </div>
                <div className="w-full">
                    <label className="text-xs text-muted font-medium">Correo del cliente</label>
                    <input type="email" name="email" id="email" className="input" placeholder="Ej: juanvldez@gmail.com" value={form.email} onChange={handleChange} disabled={loading} />
                </div>
                <div className="w-full">
                    <label className="text-xs text-muted font-medium">Número del cliente</label>
                    <input type="number" name="phone" id="phone" className="input" placeholder="Ej: 958426351" value={form.phone} onChange={handleChange} disabled={loading} />
                </div>
                <div className="w-full">
                    <label className="text-xs text-muted font-medium">Ciudad de origen del cliente</label>
                    <input type="text" name="location" id="location" className="input" placeholder="Ej: Lima" value={form.location} onChange={handleChange} disabled={loading} />
                </div>
                <div className="w-full">
                    <label className="text-xs text-muted font-medium">Canal de adquisición</label>
                    <select name="source" className="input" value={form.source} onChange={handleChange} disabled={loading}>
                        <option value={''} hidden>Selecciona como llegó</option>
                        {SOURCE_OPTIONS.map((source, i) => (
                            <option key={i} value={source}>{source}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <button className="btn btn-block btn-primary" disabled={loading}>{loading ? 'Creando...' : 'Crear nuevo cliente'}</button>
                </div>
            </div>
        </form>

    )

}