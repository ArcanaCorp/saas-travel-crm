'use client';

import FormEditPayment from "@/components/payments/FormEditPayment";
import GridRanking from "@/components/payments/GridRanking";
import ListPayments from "@/components/payments/ListPayments";
import { useDashboard } from "@/context/DashboardContext";
import { IconDownload, IconFilter2, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export default function Page () {

    const { payments, paymentsLoading } = useDashboard();
    const [ edit, setEdit ] = useState({view: false, data: null});

    const toggleEdit = (data = null) => setEdit({view: data ? true : false, data});

    return (
        <>
            
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Registro de Pagos</h1>
                    <p className="text-sm text-muted">Gestion descentralizada de transacciones y conciliación de saldos.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap"><IconPlus/> Registrar Pago</button>
                    <button className="btn btn-block flex gap-xs btn-outline text-nowrap"><IconDownload/> Exportar Reporte</button>
                </div>
            </div>

            <div className="w-full flex gap-md items-center justify-between my-lg">
                <GridRanking/>
            </div>

            <div className="w-full flex gap-sm items-start">
                <div className="w-full bg-surface overflow-hidden rounded-md">
                    <div className="w-full flex items-center justify-between p-md">
                        <h2>Últimos Movimientos</h2>
                        <button className="flex gap-xs items-center bg-surface border rounded-md justify-center py-sm px-md"><IconFilter2/> Filtrar</button>
                    </div>
                    <ul className="w-full flex flex-col">
                        <li className="w-full h flex items-center justify-between bg-neutral" style={{"--h": "60px"}}>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">CLIENTE</span>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">RESERVA / ID</span>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">TOTAL</span>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">PAGADO</span>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">ESTADO</span>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">ACCIONES</span>
                        </li>
                        <ListPayments pays={payments} loading={paymentsLoading} edit={toggleEdit} />
                    </ul>
                </div>
                {edit.view && ( <FormEditPayment close={toggleEdit} data={edit.data} /> )}
            </div>

        </>
    )
}