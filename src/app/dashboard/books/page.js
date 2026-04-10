'use client';

import FormNewBook from "@/components/books/FormNewBook";
import RowBook from "@/components/books/RowBook";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function Page () {

    const [ viewForm, setViewForm ] = useState(false)

    return (
        <>

            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Gestión de Reservas</h1>
                    <p className="text-sm text-muted">Supervisa y organiza las experiencias de tus clientes en tiempo real.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap" onClick={() => setViewForm(true)}><IconPlus/> Crear Reserva</button>
                </div>
            </div>

            <div className="w-full flex gap-md my-lg items-start">

                <div className="w-full bg-surface rounded-md border overflow-hidden">
                    <ul className="w-full flex flex-col">
                        <li className="w-full h flex gap-xs items-center px-md" style={{"--h": "60px"}}>
                            <button className={`text-xs px-md py-sm rounded-full bg-neutral`}>Todas</button>
                            <button className={`text-xs px-md py-sm rounded-full bg-neutral`}>Confirmado</button>
                            <button className={`text-xs px-md py-sm rounded-full bg-neutral`}>Pendiente</button>
                            <button className={`text-xs px-md py-sm rounded-full bg-neutral`}>Cancelados</button>
                        </li>
                        <li className="w-full h bg-neutral flex items-center justify-between" style={{"--h": "60px"}}>
                            <span className="center w-full h-full text-sm text-muted font-medium">CLIENTE</span>
                            <span className="center w-full h-full text-sm text-muted font-medium">DESTINO</span>
                            <span className="center w-full h-full text-sm text-muted font-medium">FECHA DE VIAJE</span>
                            <span className="center w-full h-full text-sm text-muted font-medium">ESTADO</span>
                        </li>
                        {Array.from({length: 8}).map((_, i) => (
                            <RowBook key={i} />
                        ))}
                    </ul>
                </div>

                {viewForm && (
                    <div className="w flex flex-col gap-md" style={{"--w": "350px", "--mnw": "350px"}}>
                        <div className="w bg-surface border rounded-md" style={{"--w": "350px", "--mnw": "350px"}}>
                            <div className="flex items-center justify-between p-md">
                                <h3>Nueva Reserva</h3>
                                <button className="center w h rounded-full" style={{"--w": "30px", "--mnw": "30px", "--h": "30px"}} onClick={() => setViewForm(false)}><IconX size={18}/></button>
                            </div>
                            <FormNewBook/>
                        </div>
                    </div>
                )}

            </div>

        </>
    )
}