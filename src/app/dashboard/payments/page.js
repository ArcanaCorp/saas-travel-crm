import RowPayment from "@/components/payments/RowPayment";
import { IconDownload, IconFilter2, IconPlus } from "@tabler/icons-react";

export default function Page () {
    return (
        <>
            
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Registro de Pagos</h1>
                    <p className="text-sm text-muted">Gestion descentralizada de transacciones y conciliación de saldos.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap"><IconDownload/> Registrar Pago</button>
                    <button className="btn btn-block flex gap-xs btn-outline text-nowrap"><IconPlus/> Exportar Reporte</button>
                </div>
            </div>

            <div className="w-full flex gap-md items-center justify-between my-lg">
                <div className="w-full flex flex-col gap-sm bg-surface rounded-md p-md border">
                    <p className="text-muted text-sm uppercase font-medium">Ingresos totales</p>
                    <h2>S/. 142,500.00</h2>
                    <p className="text-xs text-success">+12% este mes</p>
                </div>
                <div className="w-full flex flex-col gap-sm bg-surface rounded-md p-md border">
                    <p className="text-muted text-sm uppercase font-medium">Pendiente de Cobro</p>
                    <h2>S/. 85,150.00</h2>
                    <p className="text-xs text-brand-secondary text-italic">8 reservas activas</p>
                </div>
                <div className="w-full flex flex-col gap-sm bg-surface rounded-md p-md border">
                    <p className="text-muted text-sm uppercase font-medium">Pagos vencidos</p>
                    <h2 className="text-error">S/. 12,500.00</h2>
                    <p className="text-xs text-error">3 clientes en mora</p>
                </div>
                <div className="w-full flex flex-col gap-sm bg-surface rounded-md p-md border">
                    <p className="text-muted text-sm uppercase font-medium">Transacciones</p>
                    <h2>184</h2>
                    <p className="text-xs text-muted text-italic">Últimos 30 días</p>
                </div>
            </div>

            <div className="w-full bg-surface overflow-hidden rounded-md">
                <div className="w-full flex items-center justify-between p-md">
                    <h2>Últimos Movimientos</h2>
                    <button className="flex gap-xs items-center bg-surface border rounded-md justify-center py-sm px-md"><IconFilter2/> Filtrar</button>
                </div>
                <ul className="w-full h flex items-center justify-between bg-neutral" style={{"--h": "60px"}}>
                    <li className="w-full h-full flex items-center justify-center"><span className="text-sm text-muted font-medium">CLIENTE</span></li>
                    <li className="w-full h-full flex items-center justify-center"><span className="text-sm text-muted font-medium">RESERVA / ID</span></li>
                    <li className="w-full h-full flex items-center justify-center"><span className="text-sm text-muted font-medium">TOTAL</span></li>
                    <li className="w-full h-full flex items-center justify-center"><span className="text-sm text-muted font-medium">PAGADO</span></li>
                    <li className="w-full h-full flex items-center justify-center"><span className="text-sm text-muted font-medium">ESTADO</span></li>
                </ul>
                <ul className="w-full flex flex-col">
                    {Array.from({length: 8}).map((_, i) => (
                        <RowPayment key={i} i={i} />
                    ))}
                </ul>
            </div>

        </>
    )
}