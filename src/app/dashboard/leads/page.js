import CardLead from "@/components/leads/CardLead";
import { IconClock, IconDots, IconGripVertical, IconUserPlus } from "@tabler/icons-react";

export default function Page () {
    return (
        <>
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Pipeline de Prospectos</h1>
                    <p className="text-sm text-muted">Gestiona el viaje de tus clientes desde el primer contacto.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap"><IconUserPlus/> Nuevo Lead</button>
                </div>
            </div>

            <div className="w-full flex gap-md justify-between my-lg">
                <div className="w-full flex flex-col gap-md">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex gap-xs items-center">
                            <div className="w h bg-info rounded-full" style={{"--w": "8px", "--h": "24px"}}></div>
                            <h4>NUEVO</h4>
                        </div>
                        <button className="center w h rounded-sm bg-none" style={{"--w": "35px", "--mnw": "35px", "--h": "35px"}}><IconDots/></button>
                    </div>
                    <ul className="w-full flex flex-col gap-md">
                        {Array.from({length: 5}).map((_, i) => (
                            <CardLead key={i}/>
                        ))}
                    </ul>
                </div>
                <div className="w-full flex flex-col gap-md">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex gap-xs items-center">
                            <div className="w h bg-warning rounded-full" style={{"--w": "8px", "--h": "24px"}}></div>
                            <h4>COTIZADO</h4>
                        </div>
                        <button className="center w h rounded-sm bg-none" style={{"--w": "35px", "--mnw": "35px", "--h": "35px"}}><IconDots/></button>
                    </div>
                    <ul className="w-full flex flex-col gap-md">
                        {Array.from({length: 2}).map((_, i) => (
                            <CardLead key={i}/>
                        ))}
                    </ul>
                </div>
                <div className="w-full flex flex-col gap-md">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex gap-xs items-center">
                            <div className="w h bg-info rounded-full" style={{"--w": "8px", "--h": "24px"}}></div>
                            <h4>NEGOCIACIÓN</h4>
                        </div>
                        <button className="center w h rounded-sm bg-none" style={{"--w": "35px", "--mnw": "35px", "--h": "35px"}}><IconDots/></button>
                    </div>
                    <ul className="w-full flex flex-col gap-md">
                        {Array.from({length: 1}).map((_, i) => (
                            <CardLead key={i}/>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    )
}