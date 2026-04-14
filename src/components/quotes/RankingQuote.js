'use client';
import { IconBulbFilled } from "@tabler/icons-react";
import ProgressBar from "../ProgressBar";
import { useDashboard } from "@/context/DashboardContext";

export default function RankingQuote () {

    const { quotes } = useDashboard();

    // 🔹 TOTAL
    const totalQuotes = quotes.length;

    // 🔹 CONVERSIÓN (reservadas)
    const reservedQuotes = quotes.filter(q => q.status === 'reserved').length;

    const conversionRate = totalQuotes > 0 ? Math.round((reservedQuotes / totalQuotes) * 100) : 0;

    // 🔹 VALOR PROMEDIO
    const totalAmount = quotes.reduce((acc, q) => acc + Number(q.total || 0), 0);

    const averageValue = totalQuotes > 0 ? (totalAmount / totalQuotes).toFixed(2) : "0.00";

    // 🔹 DESTINO MÁS COTIZADO (TIP)
    const getTopDestination = () => {
        const map = {};

        quotes.forEach(q => {
            const name = q?.packages?.name;
            if (!name) return;

            map[name] = (map[name] || 0) + 1;
        });

        const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

        return sorted[0]?.[0] || null;
    };

    const topDestination = getTopDestination();

    // 🔹 MOSTRAR TIP SOLO SI HAY DATA
    const showTip = totalQuotes >= 5 && topDestination;

    return (
        <>
            <div className="flex w-full gap-md">
                <div className="w-full bg-surface rounded-md border p-md flex flex-col gap-sm">
                    <p className="text-sm text-muted uppercase font-medium">Tasa de conversación</p>
                    <h2>{conversionRate}% <span className="text-xs text-success">{reservedQuotes}% este mes</span></h2>
                    <ProgressBar percentage={conversionRate} />
                </div>
                <div className="w-full bg-surface rounded-md border p-md flex flex-col gap-sm">
                    <p className="text-sm text-muted uppercase font-medium">Valor promedio</p>
                    <h2>S/ {averageValue} <span className="text-xs text-success">PEN por cotización</span></h2>
                    <p className="text-xs text-muted">Basado en {totalQuotes} cotizaciones</p>
                </div>
            </div>
            {showTip && (
                <div className="w-full flex gap-sm text-success bg-success-transparent p-md rounded-md border-success">
                    <div className="center w h rounded-full border-success" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>
                        <IconBulbFilled className="text-success"/>
                    </div>
                    <div className="flex flex-col gap-xs">
                        <h4>Tip del conserje</h4>
                        <p className="text-sm">{topDestination} es el destino más cotizado actualmente.</p>
                    </div>
                </div>
            )}
        </>
    )
}