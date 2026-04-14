'use client';

import { IconDownload, IconEdit, IconMapPin, IconTrash } from "@tabler/icons-react";
import ClientGroup from "../ClientGroup";
import { formatDateLL } from "@/helpers/formatter";
import { generateQuotePDF } from "@/helpers/generatePDF";
import { useAuth } from "@/context/AuthContext";
import { statusStyle, statusTextQuote } from "@/helpers/quotes";
import { deleteQuote } from "@/services/quotes.service";
import { useDashboard } from "@/context/DashboardContext";
import { toast } from "sonner";

export default function RowQuote ({ quote, onEdit }) {

    const { user } = useAuth();
    const { removeQuote } = useDashboard();

    const handleDelete = async () => {
        try {
            await deleteQuote(quote?.id, user?.agency_id);
            removeQuote(quote?.id)
            toast.success('Eliminado', {description: 'La cotización fue eliminada correctamente'});
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message});
        }
    };

    // 🔥 confirmación
    const handleConfirmDelete = () => {
        toast('¿Eliminar cotización?', {
            description: 'Esta acción no se puede deshacer',
            action: {
                label: 'Eliminar',
                onClick: handleDelete
            },
            cancel: {
                label: 'Cancelar'
            }
        });
    };
    
    return (

        <li className="w-full h flex items-center justify-between" style={{"--h": "60px"}}>
            <div className="w-full px-sm">
                <ClientGroup name={quote?.clients.name} subtext={`${quote.pax} personas`} />
            </div>
            <div className="flex w-full h-full items-center justify-center">
                <span className="flex text-sm items-center gap-xs"><IconMapPin size={18}/> {quote?.packages.name}</span>
            </div>
            <div className="flex w-full h-full items-center justify-center">
                <span className="flex text-sm items-center gap-xs">{formatDateLL(quote.travel_date)}</span>
            </div>
            <div className="flex w-full h-full items-center justify-center">
                <span className="text-sm">S/ {(quote.total).toFixed(2)}</span>
            </div>
            <div className="flex w-full h-full items-center justify-center">
                <span className={`badge ${statusStyle[quote.status]}`}>{statusTextQuote[quote.status]}</span>
            </div>
            <div className="flex w-full h-full items-center justify-center">
                <div className="flex gap-sm">
                    <button className="center w h rounded-sm" style={{"--w": "35px", "--h": "35px"}} onClick={() => generateQuotePDF(quote, user)}><IconDownload size={18}/></button>
                    <button className="center w h rounded-sm bg-info-transparent text-info" style={{"--w": "35px", "--h": "35px"}} onClick={() => onEdit(quote)}><IconEdit size={18}/></button>
                    <button className="center w h rounded-sm bg-error-transparent text-error" style={{"--w": "35px", "--h": "35px"}} onClick={handleConfirmDelete}><IconTrash size={18}/></button>
                </div>
            </div>
        </li>

    )

}