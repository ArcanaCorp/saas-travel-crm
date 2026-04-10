'use client';

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export default function GridRanking ({ stats }) {

    return (

        <div className="w-full flex gap-md items-center justify-between my-lg">
            <div className="w-full flex flex-col gap-xs p-md bg-surface border rounded-md">
                <p className="text-sm text-muted font-medium uppercase">TOTAL DE AGENTES</p>
                <h2 className="text-2xl">{!stats ? <Skeleton count={1}/> : stats.totalAgents}</h2>
                <p className="text-xs text-success">Equipo de trabajo</p>
            </div>
            <div className="w-full flex flex-col gap-xs p-md bg-surface border rounded-md">
                <p className="text-sm text-muted font-medium uppercase">LEADS SIN ASIGNAR</p>
                <h2 className="text-2xl">{!stats ? <Skeleton count={1}/> : stats.unassignedLeads}</h2>
                <p className="text-xs text-muted">Requiere atención</p>
            </div>
            <div className="w-full flex flex-col gap-xs p-md bg-surface border rounded-md">
                <p className="text-sm text-muted font-medium uppercase">TASA DE CONVERSIÓN</p>
                <h2 className="text-2xl">{!stats ? <Skeleton count={1}/> : `${stats.conversionRate}%`}</h2>
                <p className="text-xs text-success">Ventas cerradas</p>
            </div>
            <div className="w-full flex flex-col gap-xs p-md bg-surface border rounded-md">
                <p className="text-sm text-muted font-medium uppercase">ROLES ACTIVO</p>
                <h2 className="text-2xl">{!stats ? <Skeleton count={1}/> : stats.rolesCount}</h2>
                <p className="text-xs text-muted">{!stats ? <Skeleton count={1}/> : stats.roles.join(", ")}</p>
            </div>
        </div>

    )

}