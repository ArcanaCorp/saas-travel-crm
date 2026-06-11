import { filterBookings, formatDateLL } from "@/helpers/formatter";
import ClientGroup from "../ClientGroup";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { txtStatusUser } from "@/helpers/users";
import { useDashboard } from "@/context/DashboardContext";
import { toast } from "sonner";
import { deleteBooking } from "@/services/bookings.service";

export default function RowBook ({ book, filter, onEdit }) {

    const { removeBook } = useDashboard();

    const status = filterBookings.find((f) => f.key === book.status);

    const statusStyle = {
        'finalized': 'badge-info',
        'confirmed': 'badge-success',
        'pending': 'badge-warning',
        'cancelled': 'badge-error',
    }

    const styleStatus = statusStyle[book.status] || '';

    const handleDelete = () => {

        toast("¿Eliminar reserva?", {
            description: "Esta acción ocultará la reserva del sistema.",
            action: {
                label: "Eliminar",
                onClick: async () => {
                    try {
                        await deleteBooking(book.id);
                        removeBook(book.id);
                        toast.success("Reserva eliminada correctamente.");
                    } catch (error) {
                        console.error(error);
                        toast.error('Error', { description: 'Hubo un error al eliminar. Inténtalo más tarde.' });
                    }
                }
            },
            cancel: {
                label: "Cancelar"
            }
        });
    };

    return (

        <li className={`w-full h flex items-center justify-between ${filter === 'all' || filter === book.status ? '' : 'none'}`} style={{"--h": "60px"}}>
            <div className="w-full px-md">
                <ClientGroup name={book.clients?.name} subtext={txtStatusUser[book.clients?.status]} />
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs">{book.packages?.name}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs">{formatDateLL(book.travel_date)}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs">S/. {(book?.total || 0).toFixed(2)}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className={`badge ${styleStatus}`}>{status?.value}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="flex gap-sm">
                    <button className="center w h rounded-sm bg-info-transparent text-info" style={{"--w": "35px", "--h": "35px", "--mnw": "35px"}} onClick={() => onEdit('edit', book)}><IconEdit/></button>
                    <button className="center w h rounded-sm bg-error-transparent text-error" style={{"--w": "35px", "--h": "35px", "--mnw": "35px"}} onClick={handleDelete}><IconTrash/></button>
                </div>
            </div>
        </li>

    )

}