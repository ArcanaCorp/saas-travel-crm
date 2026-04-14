'use client';

import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { createBooking } from "@/services/bookings.service";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FormNewBook ({ close }) {

    const { user } = useAuth();
    const { clients, packages, addBook, addPayment } = useDashboard();
    const [ form, setForm ] = useState({
        client_id: '',
        package_id: '',
        travel_date: '',
        pax: 1,
    })
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const subtotal = packages.find((pkg) => pkg.id === form.package_id);
            const total = subtotal.price * form.pax;
            const payload = {
                agency_id: user?.agency_id,
                total,
                ...form,
            }
            const newBook = await createBooking(payload);
            console.log(newBook); 
            addBook(newBook.bookCreated);
            addPayment(newBook.payment);
            toast.success('Se hizo realizó la reserva correctamente.')
            close();
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: `Hubo un problema: ${error.message}` })
        } finally {
            setLoading(false);
        }

    }

    return (

        <div className="w bg-surface border rounded-md" style={{"--w": "350px", "--mnw": "350px"}}>
            <div className="flex items-center justify-between p-md">
                <h3>Nueva Reserva</h3>
                <button className="center w h rounded-full" style={{"--w": "30px", "--mnw": "30px", "--h": "30px"}} onClick={close}><IconX size={18}/></button>
            </div>
            <form className="w-full p-md flex flex-col gap-md" onSubmit={handleSubmit}>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Selecciona el cliente</label>
                    <select className="input" name="client_id" id="client_id" value={form.client_id} onChange={handleChange} disabled={loading}>
                        <option value={''} hidden>Selecciona el cliente</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Selecciona un paquete</label>
                    <select className="input" name="package_id" id="package_id" value={form.package_id} onChange={handleChange} disabled={loading}>
                        <option value={''} hidden>Selecciona el cliente</option>
                        {packages.map((pack) => (
                            <option key={pack.id} value={pack.id}>{pack.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Fecha de viaje</label>
                    <input type="date" className="input" name="travel_date" id="travel_date" onChange={handleChange} disabled={loading}/>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Número de viajeros</label>
                    <input type="number" className="input" name="pax" id="pax" min={1} value={form.pax} placeholder="Número de viajeros" onChange={handleChange} disabled={loading}/>
                </div>
                <div className="w-full flex items-center justify-between">
                    <button className="btn btn-block btn-primary" disabled={loading}>{loading ? 'Reservando...' : 'Reservar'}</button>
                </div>
            </form>
        </div>

    )

}