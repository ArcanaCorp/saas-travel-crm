import { IconX } from "@tabler/icons-react";

export default function DetailsContact ({ data, toogle }) {

    return (

        <div className="w bg-surface border rounded-md p-md" style={{"--w": "350px", "--mnw": "350px"}}>
            <div className="flex items-center justify-between">
                <h3>Detalles de contacto</h3>
                <button className="center w h rounded-full" style={{"--w": "30px", "--mnw": "30px", "--h": "30px"}} onClick={() => toogle()}><IconX size={18}/></button>
            </div>
            <div className="w-full flex flex-col gap-md py-sm">
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Nombre</label>
                    <input type="text" className="input" value={data?.name} placeholder="Nombre aquí" readOnly />
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Correo</label>
                    <input type="text" className="input" value={data?.email} placeholder="Correo aquí" readOnly />
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Número</label>
                    <input type="text" className="input" value={data?.phone} placeholder="Número aquí" readOnly />
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Paquete de ínteres</label>
                    <input type="text" className="input" value={data?.package.name} placeholder="Paquete de ínteres" readOnly />
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Mensaje del cliente</label>
                    <textarea className="textarea" value={data?.message} placeholder="Mensaje del cliente" readOnly />
                </div>
            </div>
        </div>

    )

}