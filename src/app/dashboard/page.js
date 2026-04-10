import { IconDownload, IconPlus } from "@tabler/icons-react";
export default function Page () {

    return (

        <>
        
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Panel de administración</h1>
                    <p className="text-sm text-muted">Bienvenido de nuevo aquí tienes un resumen de tu actividad.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap"><IconDownload/> Exportar reporte</button>
                    <button className="btn btn-block flex gap-xs btn-outline"><IconPlus/> Nuevo itinerario</button>
                </div>
            </div>

            <div className="w-full flex gap-md my-lg">
                <div className="w-full bg-surface rounded-md p-md flex flex-col gap-md">
                    <div className="flex items-center justify-between">
                        <div className="center w h bg-neutral rounded-md" style={{"--w": "50px", "--h": "50px"}}></div>
                        <span className="bg-tertiary py-xs px-sm rounded-full text-xs text-inverse">+12%</span>
                    </div>
                    <div className="flex flex-col gap-xs">
                        <p className="text-sm text-muted">Ventas del mes</p>
                        <h3 className="h2">S/ 15,400.00</h3>
                    </div>
                </div>
                <div className="w-full bg-surface rounded-md p-md flex flex-col gap-md">
                    <div className="flex items-center justify-between">
                        <div className="center w h bg-neutral rounded-md" style={{"--w": "50px", "--h": "50px"}}></div>
                        <span className="bg-tertiary py-xs px-sm rounded-full text-xs text-inverse">+12%</span>
                    </div>
                    <div className="flex flex-col gap-xs">
                        <p className="text-sm text-muted">Leads activos</p>
                        <h3 className="h2">14</h3>
                    </div>
                </div>
                <div className="w-full bg-surface rounded-md p-md flex flex-col gap-md">
                    <div className="flex items-center justify-between">
                        <div className="center w h bg-neutral rounded-md" style={{"--w": "50px", "--h": "50px"}}></div>
                        <span className="bg-tertiary py-xs px-sm rounded-full text-xs text-inverse">+12%</span>
                    </div>
                    <div className="flex flex-col gap-xs">
                        <p className="text-sm text-muted">Cotizaciones enviadas</p>
                        <h3 className="h2">20</h3>
                    </div>
                </div>
                <div className="w-full bg-surface rounded-md p-md flex flex-col gap-md">
                    <div className="flex items-center justify-between">
                        <div className="center w h bg-neutral rounded-md" style={{"--w": "50px", "--h": "50px"}}></div>
                        <span className="bg-tertiary py-xs px-sm rounded-full text-xs text-inverse">+12%</span>
                    </div>
                    <div className="flex flex-col gap-xs">
                        <p className="text-sm text-muted">Reservas confirmadas</p>
                        <h3 className="h2">15</h3>
                    </div>
                </div>
            </div>

            <div className="w-full flex gap-md justify-between">
                <div className="w p-md bg-surface h rounded-md" style={{"--w": "60%", "--mnw": "60%", "--h": "400px"}}></div>
                <div className="w bg-surface h rounded-md" style={{"--w": "35%", "--mnw": "35%", "--h": "400px"}}>
                    <div className="w-full h flex items-center justify-between px-sm" style={{"--h": "50px"}}>
                        <h4>Actividad Reciente</h4>
                        <p>Ver todos</p>
                    </div>
                    <ul className="w-full h flex flex-col gap-xs overflow-scroll px-sm" style={{"--h": "calc(400px - 50px)"}}>
                        <li className="w-full flex gap-sm p-sm rounded-md">
                            <div className="w h rounded-full bg-neutral" style={{"--w": "60px", "--mnw": "60px", "--h": "60px"}}></div>
                            <div>
                                <p className="text-sm"><b>Lucía Mendez</b> reservó un viaje a <b className="text-brand">Cañon de Shutjo</b></p>
                                <time className="text-xs text-muted">hace 2 horas</time>
                            </div>
                        </li>
                        <li className="w-full flex gap-sm p-sm rounded-md">
                            <div className="w h rounded-full bg-neutral" style={{"--w": "60px", "--mnw": "60px", "--h": "60px"}}></div>
                            <div>
                                <p className="text-sm"><b>Lucía Mendez</b> reservó un viaje a <b className="text-brand">Cañon de Shutjo</b></p>
                                <time className="text-xs text-muted">hace 2 horas</time>
                            </div>
                        </li>
                        <li className="w-full flex gap-sm p-sm rounded-md">
                            <div className="w h rounded-full bg-neutral" style={{"--w": "60px", "--mnw": "60px", "--h": "60px"}}></div>
                            <div>
                                <p className="text-sm"><b>Lucía Mendez</b> reservó un viaje a <b className="text-brand">Cañon de Shutjo</b></p>
                                <time className="text-xs text-muted">hace 2 horas</time>
                            </div>
                        </li>
                        <li className="w-full flex gap-sm p-sm rounded-md">
                            <div className="w h rounded-full bg-neutral" style={{"--w": "60px", "--mnw": "60px", "--h": "60px"}}></div>
                            <div>
                                <p className="text-sm"><b>Lucía Mendez</b> reservó un viaje a <b className="text-brand">Cañon de Shutjo</b></p>
                                <time className="text-xs text-muted">hace 2 horas</time>
                            </div>
                        </li>
                        <li className="w-full flex gap-sm p-sm rounded-md">
                            <div className="w h rounded-full bg-neutral" style={{"--w": "60px", "--mnw": "60px", "--h": "60px"}}></div>
                            <div>
                                <p className="text-sm"><b>Lucía Mendez</b> reservó un viaje a <b className="text-brand">Cañon de Shutjo</b></p>
                                <time className="text-xs text-muted">hace 2 horas</time>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </>

    )

}