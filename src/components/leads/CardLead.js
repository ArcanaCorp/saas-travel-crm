import { IconClock, IconGripVertical } from "@tabler/icons-react";

export default function CardLead () {

    return (

        <li className="w-full bg-surface border rounded-md p-md flex flex-col gap-md">
            <div className="w-full flex items-center justify-between">
                <span className="text-xs text-error bg-error-transparent p-sm rounded-sm">ALTA PRIORIDAD</span>
                <button className="center w h rounded-sm bg-none" style={{"--w": "35px", "--h": "35px"}}><IconGripVertical size={24}/></button>
            </div>
            <div className="flex flex-col gap-xs">
                <h3>Familia Garcia</h3>
                <p className="text-brand font-medium">Ruta de la granadilla</p>
                <div className="flex items-center my-sm justify-between">
                    <p className="text-muted text-sm">s/. 120.00</p>
                    <p className="flex gap-xs text-sm text-muted"><IconClock size={16} /> 1 día</p>
                </div>
            </div>
            <div className="w-full flex items-center justify-between">
                <p className="text-sm text-muted">ASIGNADO: <b>ELENA V.</b></p>
                <picture className="block w h rounded-full bg-neutral" style={{"--w": "30px", "--mnw": "30px", "--h": "30px"}}></picture>
            </div>
        </li>

    )

}