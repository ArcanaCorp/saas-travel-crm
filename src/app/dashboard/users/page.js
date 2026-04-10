'use client';

import FormNewAgent from "@/components/users/FormNewAgent";
import GridRanking from "@/components/users/GridRanking";
import ListUser from "@/components/users/ListUser";
import RowUser from "@/components/users/RowUser";
import RowUserAlert from "@/components/users/RowUserAlert";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export default function Page () {

    const [ viewFormAgente, setViewFormAgent ] = useState(false);

    const handleToogleFormAgent = () => setViewFormAgent(!viewFormAgente)

    return (

        <>

            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Gestión de Usuarios</h1>
                    <p className="text-sm text-muted">Control de accesos, roles y asignación de cartera para el equipo.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-outline text-nowrap"><IconDownload/> Exportar lista</button>
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap" onClick={handleToogleFormAgent}><IconPlus/> Agregar Agente</button>
                </div>
            </div>

            <GridRanking/>

            <div className="w-full flex gap-md items-start">
                <div className="w-full bg-surface border rounded-md overflow-hidden">
                    <div className="w-full flex items-center justify-between p-md">
                        <h2>Directorio de Usuarios</h2>
                        <div className="flex gap-xs">
                            <span className="text-sm text-success bg-success-transparent rounded-full px-md py-sm">Activos: 2</span>
                            <span className="text-sm text-muted bg-neutral rounded-full px-md py-sm">Inactivos: 1</span>
                        </div>
                    </div>
                    <ul className="w-full flex flex-col">
                        <li className="w-full h flex items-center justify-between bg-neutral" style={{"--h": "60px"}}>
                            <span className="w-full h-full flex items-center justify-center text-xs text-muted uppercase font-medium">Nombre / Correo</span>
                            <span className="w-full h-full flex items-center justify-center text-xs text-muted uppercase font-medium">Rol</span>
                            <span className="w-full h-full flex items-center justify-center text-xs text-muted uppercase font-medium">Carga de trabajo</span>
                            <span className="w-full h-full flex items-center justify-center text-xs text-muted uppercase font-medium">Estado</span>
                            <span className="w-full h-full flex items-center justify-center text-xs text-muted uppercase font-medium">Acciones</span>
                        </li>
                        <ListUser/>
                    </ul>
                </div>
                <div className="w flex flex-col gap-md" style={{"--w": "400px", "--mnw": "400px", "--h": "400px"}}>
                    {viewFormAgente && ( <FormNewAgent toogle={handleToogleFormAgent} /> )}
                    <div className="w h bg-surface border rounded-md overflow-hidden" style={{"--w": "400px", "--mnw": "400px", "--h": "400px"}}>
                        <div className="w-full h flex items-center px-md" style={{"--h": "60px"}}>
                            <h3>Actividad reciente</h3>
                        </div>
                        <ul className="w-full h flex flex-col gap-md overflow-scroll p-md" style={{"--h": "calc(400px - 60px)"}}>
                            {Array.from({length: 1}).map((_, i) => (
                                <RowUserAlert key={i} />
                            ))}
                        </ul>
                    </div>
                    <div className="w-full p-md rounded-md bg-primary text-inverse flex flex-col gap-sm none">
                        <h3>Crece tu equipo</h3>
                        <p className="text-xs text-inverse leading-heading">
                            <span className="block mb-xs">¿Necesitas más de 6 agentes?</span>
                            Actualiza a Plan Enterprise para gestión avanzada
                            de departamentos y sucursales.
                        </p>
                        <button className="w-full text-inverse h rounded-md" style={{"--h": "48px", backgroundColor: "var(--color-primary-hover)"}}>Ver Planes</button>
                    </div>
                </div>
            </div>

        </>

    )
}