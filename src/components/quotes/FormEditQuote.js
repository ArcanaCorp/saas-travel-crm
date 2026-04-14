'use client';
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { createBooking } from "@/services/bookings.service";
import { updateQuote } from "@/services/quotes.service";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormEditQuote ({ data, closeForm }) {

    const { user } = useAuth();
    const { clients, packages, editQuote, addBook, addPayment } = useDashboard();
    const [ form, setForm ] = useState({
        client_id: '',
        package_id: '',
        travel_date: '',
        pax: 1,
        status: ''
    });
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value}))
    }

    const getTotal = () => {
        if (form.package_id === '') return 0;
        const pkg = packages.find((pk) => pk.id === form.package_id);
        const subtotal = pkg.price * form.pax;
        return subtotal;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.client_id || !form.package_id || !form.pax || !form.travel_date) return toast.warning('Completa los campos antes de continuar.')
        try {
            setLoading(true);
            const res = await updateQuote(data?.id, form, user?.agency_id)
            editQuote(res)
            toast.success('Se actualizó con éxito la cotización')
            closeForm();
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: `Hubo un error: ${error.message}` })
        } finally {
            setLoading(false)
        }
    }

    const handleBooking = async () => {
        try {
            setLoading(true);
            const { bookCreated, payment } = await createBooking(data)
            addBook(bookCreated)
            addPayment(payment)
            toast.success('Se realizó la reserva exitosamente')
            closeForm();
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: `Hubo un error: ${error.message}` })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (data) {
            setForm({
                client_id: data.client_id || '',
                package_id: data.package_id || '',
                travel_date: data.travel_date || '',
                pax: data.pax || 1,
                status: data.status || ''
            })
        }
    }, [data])

    return (

        <div className="w bg-surface border rounded-md p-md" style={{"--w": "350px", "--mnw": "350px"}}>
            <div className="flex items-center justify-between">
                <h3>Editar cotización</h3>
                <button className="center w h rounded-full" style={{"--w": "30px", "--mnw": "30px", "--h": "30px"}} onClick={closeForm}><IconX size={18}/></button>
            </div>
            <form className="w-full flex flex-col gap-md py-md" onSubmit={handleSubmit}>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Nombre del cliente</label>
                    <select className="input" name="client_id" id="client_id" value={form.client_id} onChange={handleChange} disabled={loading}>
                        <option value={''} hidden>Destino del cliente</option>
                        <option value={'create'}>Crear cliente</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Destino del cliente</label>
                    <select className="input" name="package_id" id="package_id" value={form.package_id} onChange={handleChange} disabled={loading}>
                        <option value={''} hidden>Destino del cliente</option>
                        {packages.map((pack) => (
                            <option key={pack.id} value={pack.id}>{pack.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Fecha de Viaje</label>
                    <input type="date" name="travel_date" id="travel_date" className="input" value={form.travel_date} onChange={handleChange} disabled={loading}/>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Número de Viajeros</label>
                    <input type="number" className="input" name="pax" min={1} placeholder="Número de Viajeros" value={form.pax} onChange={handleChange} disabled={loading}/>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Estado de la cotización</label>
                    <select className="input" name="status" id="status" value={form.status} onChange={handleChange} disabled={loading}>
                        <option value={''} hidden>Actualiza el estado</option>
                        <option value={'draft'}>Borrador</option>
                        <option value={'sent'}>Enviado</option>
                    </select>
                </div>
                <div className="w-full flex items-center justify-between">
                    <p className="text-muted uppercase font-medium">Total Estimado</p>
                    <p className="text-xl font-medium">S/. {getTotal()}.00</p>
                </div>
                <div className="w-full flex gap-xs">
                    <button className="btn btn-block btn-primary" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
                </div>
            </form>
            <div className="w-full">
                <button className="btn btn-outline" onClick={handleBooking} disabled={loading}>{loading ? 'Reservando...' : 'Realizar reserva'}</button>
            </div>
        </div>

    )

}