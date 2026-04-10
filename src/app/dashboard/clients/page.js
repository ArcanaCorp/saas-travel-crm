import RowClient from "@/components/clients/RowClient";
import { IconChevronLeft, IconChevronRight, IconDots, IconStar, IconUserPlus } from "@tabler/icons-react";
export default function Page () {
    return (
        <>
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Directorio de clientes</h1>
                    <p className="text-sm text-muted">Gestiona tu cartera de viajeros de lujo y cuentas corporativas.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap"><IconUserPlus/> Nuevo cliente</button>
                </div>
            </div>

            <div className="w-full flex gap-md my-lg">
                <div className="w-full bg-surface p-md border rounded-md">
                    <p className="text-brand text-sm font-medium">ESTADO DEL MES</p>
                    <h3 className="text-xl font-regular mb-md">Crecimiento de Cartera</h3>
                    <ul className="flex gap-sm">
                        <li>
                            <h3 className="text-xl font-medium">124</h3>
                            <p className="text-sm text-muted font-regular">Nuevos este mes</p>
                        </li>
                        <li>
                            <h3 className="text-xl font-medium">89%</h3>
                            <p className="text-sm text-muted font-regular">Tasa de fidelidad</p>
                        </li>
                    </ul>
                </div>
                <div className="w rounded-md p-md bg-primary text-inverse" style={{"--w": "400px", "--mnw": "400px"}}>
                    <IconStar/>
                    <h4>Segmento VIP</h4>
                    <p>12 clientes han ascendido a categoria Corporativa este trimestre.</p>
                </div>
            </div>

            <div className="w-full rounded-md overflow-hidden border">
                <ul className="flex items-center justify-between">
                    <li className="w-full h flex items-center justify-center text-sm text-muted font-bold" style={{"--h": "40px"}}>NOMBRE</li>
                    <li className="w-full h flex items-center justify-center text-sm text-muted font-bold" style={{"--h": "40px"}}>EMAIL</li>
                    <li className="w-full h flex items-center justify-center text-sm text-muted font-bold" style={{"--h": "40px"}}>TELÉFONO</li>
                    <li className="w-full h flex items-center justify-center text-sm text-muted font-bold" style={{"--h": "40px"}}>TIPO</li>
                    <li className="w-full h flex items-center justify-center text-sm text-muted font-bold" style={{"--h": "40px"}}>ACCIONES</li>
                </ul>
                <ul className="w-full flex flex-col bg-surface">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <RowClient key={idx} />
                    ))}
                </ul>
                <div className="w-full flex items-center justify-between bg-surface p-md">
                    <p className="text-xs text-muted">Mostrando <b>1 - 5</b> de 412 clientes</p>
                    <div className="flex gap-xs">
                        <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}><IconChevronLeft/></button>
                        <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>1</button>
                        <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>2</button>
                        <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>3</button>
                        <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}><IconChevronRight/></button>
                    </div>
                </div>
            </div>

        </>
    )
}