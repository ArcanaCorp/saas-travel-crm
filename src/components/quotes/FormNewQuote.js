'use client';

import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { createQuote } from "@/services/quotes.service";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FormNewQuote ({ closeForm }) {
    
    const { user } = useAuth();
    const { clients, packages, addQuote } = useDashboard();
    const [ form, setForm ] = useState({
        clientId: '',
        clientName: '',
        clientNumber: '',
        destination: '',
        travelDate: '',
        pax: 1
    });
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value}))
    }

    const getTotal = () => {
        if (form.destination === '') return 0;
        const pkg = packages.find((pk) => pk.id === form.destination);
        const subtotal = pkg.price * form.pax;
        return subtotal;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.clientId || !form.destination || !form.pax || !form.travelDate) return toast.warning('Completa los datos para continuar.')

        try {
            setLoading(true);
            const data = await createQuote(form, user?.agency_id);
            addQuote(data)
            toast.success('Se creó con éxito la cotización')
            closeForm();
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: `Hubo un error: ${error.message}` })
        } finally {
            setLoading(false);
        }

    }    

    return (
        <div className="w bg-surface border rounded-md" style={{"--w": "350px", "--mnw": "350px"}}>
            <div className="flex items-center justify-between p-md">
                <h3>Crear cotización</h3>
                <button className="center w h rounded-full" style={{"--w": "30px", "--mnw": "30px", "--h": "30px"}} onClick={closeForm}><IconX size={18}/></button>
            </div>
            <form className="w-full p-md flex flex-col gap-md" onSubmit={handleSubmit}>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Nombre del cliente</label>
                    <select className="input" name="clientId" id="clientId" value={form.clientId} onChange={handleChange} disabled={loading}>
                        <option value={''} hidden>Destino del cliente</option>
                        <option value={'create'}>Crear cliente</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                </div>
                {form.clientId === 'create' && (
                    <div className="w-full flex gap-sm">
                        <div className="w-full">
                            <label className="block text-muted text-sm font-medium mb-xs">Nombre cliente</label>
                            <input type="text" className="input" name="clientName" id="clientName" placeholder="Ej: Francisco Perez" value={form.clientName} onChange={handleChange} disabled={loading}/>
                        </div>
                        <div className="w-full">
                            <label className="block text-muted text-sm font-medium mb-xs">Número cliente</label>
                            <input type="text" className="input" name="clientNumber" id="clientNumber" placeholder="Ej: 999888777" value={form.clientNumber} onChange={handleChange} disabled={loading}/>
                        </div>
                    </div>
                )}
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Destino del cliente</label>
                    <select className="input" name="destination" id="destination" value={form.destination} onChange={handleChange} disabled={loading}>
                        <option value={''} hidden>Destino del cliente</option>
                        {packages.map((pack) => (
                            <option key={pack.id} value={pack.id}>{pack.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Fecha de Viaje</label>
                    <input type="date" name="travelDate" id="travelDate" className="input" value={form.travelDate} onChange={handleChange} disabled={loading}/>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Número de Viajeros</label>
                    <input type="number" className="input" name="pax" min={1} placeholder="Número de Viajeros" value={form.pax} onChange={handleChange} disabled={loading}/>
                </div>
                <div className="w-full flex items-center justify-between">
                    <p className="text-muted uppercase font-medium">Total Estimado</p>
                    <p className="text-xl font-medium">S/. {getTotal()}.00</p>
                </div>
                <div className="w-full flex gap-xs">
                    <button className="btn btn-block btn-primary" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</button>
                </div>
            </form>
        </div>
    )
}