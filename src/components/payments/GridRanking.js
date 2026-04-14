'use client';

import { useDashboard } from "@/context/DashboardContext";
import { getPaymentStats } from "@/helpers/payment";

export default function GridRanking () {

    const { payments } = useDashboard();

    const payStats = getPaymentStats(payments);

    return (

        <>
            <div className="w-full flex flex-col gap-sm bg-surface rounded-md p-md border">
                <p className="text-muted text-sm uppercase font-medium">Ingresos totales</p>
                <h2>S/. {payStats?.totalIncome}</h2>
                <p className="text-xs text-success">+12% este mes</p>
            </div>
            <div className="w-full flex flex-col gap-sm bg-surface rounded-md p-md border">
                <p className="text-muted text-sm uppercase font-medium">Pendiente de Cobro</p>
                <h2>S/. {payStats?.totalPending}</h2>
                <p className="text-xs text-brand-secondary text-italic">por cobrar</p>
            </div>
            <div className="w-full flex flex-col gap-sm bg-surface rounded-md p-md border">
                <p className="text-muted text-sm uppercase font-medium">Pagos vencidos</p>
                <h2 className="text-error">S/. {payStats?.overdue}</h2>
                <p className="text-xs text-error">clientes en mora</p>
            </div>
            <div className="w-full flex flex-col gap-sm bg-surface rounded-md p-md border">
                <p className="text-muted text-sm uppercase font-medium">Transacciones</p>
                <h2>{payStats?.transactions}</h2>
                <p className="text-xs text-muted text-italic">Últimos 30 días</p>
            </div>
        </>

    )

}