import { IconPencil, IconTrash } from "@tabler/icons-react";
import ClientGroup from "../ClientGroup";
import { rolesName } from "@/helpers/formatter";
import { deleteAgent } from "@/services/users.service";
import { toast } from "sonner";

export default function RowUser ({ agente, update, refresh }) {

    const handleDelete = async () => {
        try {
            await deleteAgent(agente.id);
            await refresh();
            toast.success('Eliminado', {description: 'El agente fue eliminado correctamente'});
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message});
        }
    };

    // 🔥 confirmación
    const handleConfirmDelete = () => {
        toast('¿Eliminar agente?', {
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
            <div className="w-full px-xs">
                <ClientGroup picture={false} name={agente?.name} subtext={agente?.email} />
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs font-medium px-md py-sm rounded-md bg-neutral">{rolesName[agente?.role]}</span>
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full flex flex-col gap-xs">
                    <p className="w-full flex items-center justify-between">
                        <span className="text-xs text-muted">0 leads</span>
                        <span className="text-xs text-muted">0%</span>
                    </p>
                    <div className="w-full h rounded-full overflow-hidden bg-neutral" style={{"--h": "8px"}}>
                        <div className="w h-full bg-success" style={{"--w": `0%`}}></div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <p className="flex items-center gap-xs text-xs text-success"><span className="center w h bg-success rounded-full" style={{"--w": "8px", "--h": "8px"}}></span> Online</p>
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex gap-xs">
                    <button className="center w h rounded-md bg-info-transparent text-info" style={{"--w": "35px", "--h": "35px"}} onClick={() => update(agente)}><IconPencil/></button>
                    <button className="center w h rounded-md bg-error-transparent text-error" style={{"--w": "35px", "--h": "35px"}} onClick={handleConfirmDelete}><IconTrash/></button>
                </div>
            </div>
        </li>
    )
}