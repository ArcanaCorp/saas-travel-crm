'use client';
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ClientGroup from "../ClientGroup";
import { toast } from "sonner";
import { deleteClient } from "@/services/client.service";
import { useAuth } from "@/context/AuthContext";
import { txtStatusUser } from "@/helpers/users";

export default function RowClient ({ client, remove, openEdit }) {

    const { user } = useAuth();

    const handleDelete = async () => {
        try {
            await deleteClient(client.id, user?.agency_id);
            remove(client.id);
            toast.success('Eliminado', {description: 'El cliente fue eliminado correctamente'});
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message});
        }
    };

    // 🔥 confirmación
    const handleConfirmDelete = () => {
        toast('¿Eliminar cliente?', {
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
                <ClientGroup name={client.name} subtext={client.location || 'Perú'} />
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-sm text-muted">{client.email}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-sm text-muted">{client.phone}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs">{txtStatusUser[client.status]}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs">{client.source}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="flex gap-sm">
                    <button className="center w h rounded-sm bg-info-transparent text-info" style={{"--w": "35px", "--h": "35px", "--mnw": "35px"}} onClick={() => openEdit(client)}><IconEdit/></button>
                    <button className="center w h rounded-sm bg-error-transparent text-error" style={{"--w": "35px", "--h": "35px", "--mnw": "35px"}} onClick={handleConfirmDelete}><IconTrash/></button>
                </div>
            </div>
        </li>
    )
}