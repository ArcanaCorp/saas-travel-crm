import { IconEdit, IconTrash } from "@tabler/icons-react";
import ClientGroup from "../ClientGroup";
import ProgressBar from "../ProgressBar";

export default function RowPayment ({ pay, edit }) {

    const total = pay?.bookings?.total || 0;
    const remaining = pay?.remaining || 0;

    const paid = total - remaining;

    const percentage = total > 0 
        ? Math.min((paid / total) * 100, 100)
        : 0;

    // 🔥 estados visuales
    const isPaid = remaining === 0;
    const isPartial = remaining > 0 && paid > 0;
    const isPending = paid === 0;

    return (
        <li className="w-full h flex items-center justify-between" style={{"--h": "60px"}}>
            <div className="w-full px-sm">
                <ClientGroup name={pay?.clients.name} subtext={pay?.clients.email} />
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs font-medium">{pay?.bookings?.packages?.name || '-'}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <p className="text-xs font-medium">S/. {(pay?.remaining).toFixed(2)}</p>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="w-full flex flex-col gap-xs">
                    <ProgressBar percentage={percentage} />
                    <div className="flex items-center justify-between">
                        <span className="text-center text-xs text-muted">s/. {paid.toFixed(2)}</span>
                        <span className="text-center text-xs text-muted">({Math.round(percentage)}%)</span>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className={`badge ${isPaid ? 'badge-success' : ''} ${isPartial ? 'badge-warning' : ''} ${isPending ? 'badge-neutral' : ''}`}>
                    {isPaid && 'Pagado'}
                    {isPartial && 'Parcial'}
                    {isPending && 'Pendiente'}
                </span>
            </div>
            <div className="flex w-full h-full items-center justify-center">
                <div className="flex gap-xs">
                    <button className="center w h rounded-sm bg-info-transparent text-info" style={{"--w": "35px", "--h": "35px"}} onClick={() => edit(pay)}><IconEdit size={18}/></button>
                    <button className="center w h rounded-sm bg-error-transparent text-error" style={{"--w": "35px", "--h": "35px"}}><IconTrash size={18}/></button>
                </div>
            </div>
        </li>
    )
}