'use client';

import { updateAgent } from "@/services/users.service";
import { IconEye, IconEyeClosed, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormEditAgent ({ toogle, data, refresh }) {
    
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
        if (!form.name || !form.email || !form.role) return toast.warning('Alerta', { description: 'Nombre, correo y rol son obligatorios' });
        try {
            setLoading(true);
            const payload = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                role: form.role,
            };

            // 👉 solo enviar password si existe
            if (form.password && form.password.trim() !== "") {
                payload.password = form.password;
            }

            await updateAgent(data.id, payload);

            toast.success('Éxito', { description: 'Se actualizó con éxito al usuario' })

            await refresh();

            toogle();

        } catch (error) {
            console.error(error);
            toast.error('Error', { description: `Error: ${error.message}` })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (data) {
            setForm({
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                role: data.role || "",
                password: ""
            });
        }
    }, [data]);

    return (

        <div className="w-full p-md rounded-md bg-surface border">
            <div className="w-full flex items-center justify-between">
                <h3>Editar agente</h3>
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
                    <button className="w-full h rounded-md bg-primary text-inverse bg-primary-hover" style={{"--h": "48px"}} disabled={loading} onClick={handleSubmit}>{loading ? 'Editando...' : 'Editar agente'}</button>
                </div>
            </div>
        </div>

    )

}