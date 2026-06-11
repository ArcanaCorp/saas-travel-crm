'use client';
import { useDashboard } from "@/context/DashboardContext";
import { filterBookings, statusBook } from "@/helpers/formatter";
import { updateBooking } from "@/services/bookings.service";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormEditBook ({ book, close }) {

    const { packages, editBook } = useDashboard();
    const [ form, setForm ] = useState({
        client_id: '',
        client_name: '',
        package_id: '',
        travel_date: '',
        pax: '',
        status: '',
        total: ''
    })

    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => {
            const newForm = {
                ...prev,
                [name]: value
            };

            // Obtener el paquete seleccionado
            const selectedPackage = packages.find(
                p => p.id === newForm.package_id
            );

            if (selectedPackage) {
                newForm.total =
                    Number(selectedPackage.price) *
                    Number(newForm.pax || 0);
            }

            return newForm;
        });
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await updateBooking(book, form, packages);
            if (!res.updated) {
                toast.warning('Alerta', { description: 'No se pudo actualizar. Inténtalo más tarde.' })
                close();
                return;
            }
            editBook(res.booking)
            toast.success('Éxito', { description: 'Reserva actualizada.' })
            close();
        } catch (err) {
            console.error(err);
            toast.error('Error', { description: 'Hubo un error al actualizar. Inténtalo más tarde.' })
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (book) {
            setForm({
                client_id: book?.clients.id ?? "",
                client_name: book?.clients.name ?? "",
                package_id: book?.packages.id ?? "",
                travel_date: book?.travel_date ?? "",
                pax: book?.pax ?? "",
                status: book?.status ?? "",
                total: book?.total ?? 0
            })
        }
    }, [book]);

    return (
        <div className="w bg-surface border rounded-md" style={{"--w": "350px", "--mnw": "350px"}}>
            <div className="flex items-center justify-between p-md">
                <h3>Editar Reserva</h3>
                <button className="center w h rounded-full" style={{"--w": "30px", "--mnw": "30px", "--h": "30px"}} onClick={close}><IconX size={18}/></button>
            </div>
            <div className="w-full p-md flex flex-col gap-md">
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs" htmlFor="client_id">Cliente</label>
                    <input type="text" className="input" name="client_id" id="client_id" value={form.client_name} placeholder="Cliente" disabled/>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs" htmlFor="package_id">Destino</label>
                    <select className="input" name="package_id" id="package_id" value={form.package_id} onChange={handleChange}>
                        <option value={''}>Cambiar destino</option>
                        {packages.map((pck) => (
                            <option key={pck.id} value={pck.id}>{pck.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs" htmlFor="pax">Viajeros</label>
                    <input type="number" inputMode="numeric" className="input" name="pax" id="pax" value={form.pax} placeholder="Viajeros" onChange={handleChange}/>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs" htmlFor="travel_date">Fecha de viaje</label>
                    <input type="date" className="input" name="travel_date" id="travel_date" value={form.travel_date} placeholder="Fecha de viaje" onChange={handleChange}/>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs" htmlFor="date">Estado</label>
                    <select className="input" name="status" id="status" value={form.status} onChange={handleChange}>
                        <option value={''}>Actualizar estado de reserva</option>
                        {filterBookings.map((state) => (
                            <option key={state.key} value={state.key}>{state.value}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs" htmlFor="pay_total">Total</label>
                    <input type="text" className="input" name="pay_total" id="pay_total" value={(form?.total || 0).toFixed(2)} placeholder="Total" readOnly/>
                </div>
                <div className="w-full">
                    <button className="btn btn-block btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Editando...' : 'Editar reseva'}</button>
                </div>
            </div>
        </div>
    )
}