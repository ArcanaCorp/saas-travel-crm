'use client';
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { paymentMethod } from "@/helpers/payment";
import { updatePayment } from "@/services/payments.service";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormEditPayment ({ close, data }) {

    const { user } = useAuth();
    const { clients, editPayment } = useDashboard();

    const [ form, setForm ] = useState({
        client_id: '',
        amount: '',
        method: '',
        reference: '',
        status: '',
        paid_at: ''
    })
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (data) {
            setForm({
                client_id: data.client_id || "",
                amount: data.amount || 0.00,
                method: data.method || "",
                reference: data.reference || "",
                status: data.status || "",
                paid_at: data.paid_at?.slice(0, 10) || ""
            })
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const paymentResponse = await updatePayment(data.id, form, user?.agency_id);
            editPayment(paymentResponse)
            toast.success('Se actualizó con éxito el pago')
            close();
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: `Hubo un problema: ${error.message}` })
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="w bg-surface border rounded-md p-md" style={{"--w": "350px", "--mnw": "350px"}}>
            <div className="flex items-center justify-between">
                <h3>Editar pago</h3>
                <button className="center w h rounded-full" style={{"--w": "30px", "--mnw": "30px", "--h": "30px"}} onClick={() => close()}><IconX size={18}/></button>
            </div>
            <form className="w-full flex flex-col gap-md py-sm" onSubmit={handleSubmit}>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Selecciona el cliente</label>
                    <select className="input" name="client_id" id="client_id" value={form.client_id} onChange={handleChange} disabled>
                        <option value={''} hidden>Selecciona el cliente</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Monto pagado</label>
                    <input type="number" name="amount" className="input" value={form.amount} onChange={handleChange} disabled={loading}/>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Método de pago</label>
                    <select name="method" className="input" value={form.method} onChange={handleChange} disabled={loading}>
                        <option value="">Selecciona</option>
                        {paymentMethod.map((method, i) => (
                            <option key={i} value={method}>{method}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Referencia</label>
                    <input type="text" name="reference" className="input" placeholder="Referencia" value={form.reference} onChange={handleChange} disabled={loading}/>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Estado</label>
                    <select name="status" className="input" value={form.status} onChange={handleChange} disabled={loading}>
                        <option value="pending">Pendiente</option>
                        <option value="partial">Parcial</option>
                        <option value="paid">Pagado</option>
                    </select>
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Fecha de pago</label>
                    <input type="date" name="paid_at" className="input" value={form.paid_at} onChange={handleChange} disabled={loading}/>
                </div>
                <button className="btn btn-block btn-primary" disabled={loading}>{loading ? 'Editando...' : 'Editar pago'}</button>
            </form>
        </div>

    )

}