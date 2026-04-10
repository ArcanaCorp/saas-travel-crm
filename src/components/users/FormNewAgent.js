'use client';

import { useAuth } from "@/context/AuthContext";
import { IconEye, IconEyeClosed, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FormNewAgent ({ toogle }) {

    const { user } = useAuth();

    const [ form, setForm ] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        role: ''
    })
    const [ viewPwd, setViewPwd ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {

        if (!form.name || !form.email || !form.password || !form.role) return toast.warning('Alerta', { description: 'Completa los campos obligatorios (*)' })

        try {

            setLoading(true);

            const res = await fetch("/api/admin/create-agent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    name: form.name,
                    phone: form.phone,
                    role: form.role,
                    agency_id: user.agency_id,
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            toast.success('Éxito', { description: 'Se creó con éxito al nuevo agente.' })

        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
            toogle();
        }
    }

    return (

        <div className="w-full p-md rounded-md bg-surface border">
            <div className="w-full flex items-center justify-between">
                <h3>Agregar nuevo agente</h3>
                <button className="center w h rounded-full" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={toogle}><IconX/></button>
            </div>
            <div className="w-full flex flex-col gap-md">
                <div className="w-full">
                    <label className="text-xs text-muted font-medium">Ingresa el nombre (*)</label>
                    <div className="w-full">
                        <input type="text" name="name" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ingresa su nombre (*)" autoComplete="off" value={form.name} onChange={handleChange} disabled={loading} />
                    </div>
                </div>
                <div className="w-full">
                    <label className="text-xs text-muted font-medium">Ingresa el número de contacto</label>
                    <div className="w-full">
                        <input type="number" name="phone" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ingresa su número de contacto" autoComplete="off" value={form.phone} onChange={handleChange} disabled={loading} />
                    </div>
                </div>
                <div className="w-full">
                    <label className="text-xs text-muted font-medium">Ingresa el correo electrónico (*)</label>
                    <div className="w-full">
                        <input type="email" name="email" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ingresa su correo electrónico (*)" autoComplete="off" value={form.email} onChange={handleChange} disabled={loading} />
                    </div>
                </div>
                <div className="w-full">
                    <label className="text-xs text-muted font-medium">Ingresa su contraseña (*)</label>
                    <div className="relative w-full">
                        <input type={viewPwd ? 'text' : 'password'} name="password" className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} placeholder="Ingresa su contraseña (*)" autoComplete="off" value={form.password} onChange={handleChange} disabled={loading} />
                        <span className="absolute center w h" style={{"--w": "48px", "--mnw": "48px", "--h": "48px", top: '0', right: '0'}} onClick={() => setViewPwd(!viewPwd)}>{viewPwd ? <IconEyeClosed/> : <IconEye/>}</span>
                    </div>
                </div>
                <div className="w-full">
                    <label className="text-xs text-muted font-medium">Selecciona el rol (*)</label>
                    <div className="w-full">
                        <select className="w-full h bg-neutral border rounded-md px-md" style={{"--h": "48px"}} name="role" value={form.role} onChange={handleChange} disabled={loading}>
                            <option value={''} hidden>Selecciona el rol (*)</option>
                            <option value={'admin'}>Administración</option>
                            <option value={'agent'}>Agente</option>
                            <option value={'view'}>Visita</option>
                        </select>
                    </div>
                </div>
                <div className="w-full">
                    <button className="w-full h rounded-md bg-primary text-inverse bg-primary-hover" style={{"--h": "48px"}} disabled={loading} onClick={handleSubmit}>{loading ? 'Creando...' : 'Crear nuevo agente'}</button>
                </div>
            </div>
        </div>
        
    )

}