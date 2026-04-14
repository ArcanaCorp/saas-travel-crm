'use client';

import GridRanking from "@/components/dashboard/GridRanking";
import RowAlerts from "@/components/dashboard/RowAlerts";
import SummaryChart from "@/components/dashboard/SummaryChart";
import { useDashboard } from "@/context/DashboardContext";
import { IconDownload } from "@tabler/icons-react";
import moment from "moment";
export default function Page () {

    const { clients, quotes, bookings, payments } = useDashboard();

    // 🔹 KPIs
    const monthlySales = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);

    const activeLeads = clients.length; // puedes mejorar luego con leads reales

    const quotesSent = quotes.length;

    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

    const summary = {
        monthly_sales: monthlySales,
        active_leads: activeLeads,
        quotes_sent: quotesSent,
        confirmed_bookings: confirmedBookings
    };

    // 🔹 CHART DATA (ventas por mes desde payments)
    const summarySales = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;

        const total = payments
            .filter(p => new Date(p.created_at).getMonth() + 1 === month)
            .reduce((acc, p) => acc + Number(p.amount || 0), 0);

        return { month, total };
    });

    // 🔹 ALERTAS SIMPLES
    const alerts = payments.slice(0, 10).map(p => ({
        id: p.id,
        message: `Pago registrado de ${p.clients?.name}`,
        date: p.created_at
    }));

    return (

        <>
        
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Panel de administración</h1>
                    <p className="text-sm text-muted">Bienvenido de nuevo aquí tienes un resumen de tu actividad.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap"><IconDownload/> Exportar reporte</button>
                </div>
            </div>

            <div className="w-full flex gap-md my-lg">
                <GridRanking summary={summary} />
            </div>

            <div className="w-full flex gap-md justify-between">
                <div className="w p-md bg-surface h rounded-md" style={{"--w": "60%", "--mnw": "60%", "--h": "400px"}}>
                    <SummaryChart data={summarySales} />
                </div>
                <div className="w bg-surface h rounded-md" style={{"--w": "35%", "--mnw": "35%", "--h": "400px"}}>
                    <div className="w-full h flex items-center justify-between px-sm" style={{"--h": "50px"}}>
                        <h4>Actividad Reciente</h4>
                    </div>
                    <ul className="w-full h flex flex-col gap-xs overflow-scroll px-sm" style={{"--h": "calc(400px - 50px)"}}>
                        {alerts.map((alert) => (
                            <RowAlerts key={alert.id} alert={alert} />
                        ))}
                    </ul>
                </div>
            </div>

        </>

    )

}