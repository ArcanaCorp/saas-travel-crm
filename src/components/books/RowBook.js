import { filterBookings, formatDateLL } from "@/helpers/formatter";
import ClientGroup from "../ClientGroup";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { txtStatusUser } from "@/helpers/users";

export default function RowBook ({ book, filter }) {

    const status = filterBookings.find((f) => f.key === book.status);

    const statusStyle = {
        'finalized': 'badge-info',
        'confirmed': 'badge-success',
        'pending': 'badge-warning',
        'cancelled': 'badge-error',
    }

    const styleStatus = statusStyle[book.status] || '';

    return (

        <li className={`w-full h flex items-center justify-between`} style={{"--h": "60px"}}>
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
                    <button className="center w h rounded-sm bg-info-transparent text-info" style={{"--w": "35px", "--h": "35px", "--mnw": "35px"}}><IconEdit/></button>
                    <button className="center w h rounded-sm bg-error-transparent text-error" style={{"--w": "35px", "--h": "35px", "--mnw": "35px"}}><IconTrash/></button>
                </div>
            </div>
        </li>

    )

}