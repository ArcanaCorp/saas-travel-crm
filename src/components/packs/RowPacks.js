import { IconPencil, IconTrash } from "@tabler/icons-react";
import ClientGroup from "../ClientGroup";
import { toast } from "sonner";
import { deletePackage } from "@/services/packages.service";

export default function RowPacks ({ pack }) {

    const handleDelete = async () => {
        try {
            const promise = deletePackage(pack.id);
            toast.promise(promise, {
                loading: "Eliminando paquete...",
                success: "Paquete eliminado correctamente",
                error: (err) => `Error: ${err.message}`,
            });
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: `Error: ${error.message}` })
        }
    }

    const handleQuestionDelete = async () => {
        toast('¿Deseas eliminar el paquete?', {
            description: 'Esta acción no se podrá deshacer una vez completa.', 
            action: {
                label: 'Sí, deseo eliminar',
                onClick: handleDelete()
            },
            cancel: {
                label: 'No, deseo mantenerlo'
            }
        })
    }

    return (

        <li className="w-full h flex items-center justify-between" style={{"--h": "60px"}}>
            <div className="w-full">
                <ClientGroup picture={false} name={pack?.name} subtext={pack?.location} />
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="px-md py-sm bg-neutral text-xs rounded-md">{pack?.type}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <p className="text-md font-medium">S/. {(pack?.price).toFixed(2)}</p>
            </div>
            <div className="w-full flex items-center justify-center">
                <p className="text-sm flex items-center gap-xs"><span className={`block w h rounded-full bg-${pack?.status === "active" ? 'success' : 'error'}`} style={{"--w": "8px", "--h": "8px"}}></span>{pack?.status === "active" ? 'Activo' : 'Descativado'}</p>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="flex gap-xs">
                    <button className="center w h rounded-sm bg-info text-info" style={{"--w": "35px", "--h": "35px"}}><IconPencil/></button>
                    <button className="center w h rounded-sm bg-error-transparent text-error" style={{"--w": "35px", "--h": "35px"}} onClick={handleQuestionDelete}><IconTrash/></button>
                </div>
            </div>
        </li>

    )

}