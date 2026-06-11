'use client';

import DetailsContact from "@/components/web/DetailsContact";
import GridRanking from "@/components/web/GridRanking";
import ListContacts from "@/components/web/ListContacts";
import { useDashboard } from "@/context/DashboardContext";
import { useState } from "react";

export default function Page () {

    const { landing, landingLoading, contacts, contactsLoading } = useDashboard();
    const [ details, setDetails ] = useState({view: false, data: null});

    const toogleDetails = (data = null) => setDetails({view: !details.view, data: data});

    return (
        <>

            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Página web</h1>
                    <p className="text-sm text-muted">Gestiona tu página web desde un solo lugar.</p>
                </div>
            </div>

            <div className="w-full my-lg">
                <GridRanking landing={landing} loading={landingLoading} />
            </div>

            <div className="w-full flex gap-sm items-start">
                <div className="w-full bg-surface overflow-hidden rounded-md">
                    <div className="w-full flex items-center justify-between p-md">
                        <h2>Formulario de contacto</h2>
                    </div>
                    <ul className="w-full flex flex-col">
                        <li className="w-full h flex items-center justify-between bg-neutral" style={{"--h": "60px"}}>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">Nombres</span>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">Correo</span>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">Número</span>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">Paquete</span>
                            <span className="w-full h-full flex items-center justify-center text-sm text-muted font-medium">Más</span>
                        </li>
                        <ListContacts contacts={contacts} loading={contactsLoading} toogle={toogleDetails} />
                    </ul>
                </div>
                {details.view && ( <DetailsContact data={details.data} toogle={toogleDetails} /> )}
            </div>

        </>
    )
}