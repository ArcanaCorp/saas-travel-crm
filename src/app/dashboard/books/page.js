'use client';

import FormNewBook from "@/components/books/FormNewBook";
import ListBooks from "@/components/books/ListBooks";
import { useDashboard } from "@/context/DashboardContext";
import { filterBookings } from "@/helpers/formatter";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function Page () {

    const { bookings, bookingsLoading } = useDashboard();

    const [ viewForm, setViewForm ] = useState(false);
    const [ filter, setFilter ] = useState('all')

    const toggleNewForm = () => setViewForm(!viewForm);

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
                            {filterBookings.map((f) => (
                                <button key={f.key} className={`badge ${f.key === filter ? 'badge-active' : ''}`} onClick={() => setFilter(f.key)}>{f.value}</button>
                            ))}
                        </li>
                        <li className="w-full h bg-neutral flex items-center justify-between" style={{"--h": "60px"}}>
                            <span className="center w-full h-full text-sm text-muted font-medium uppercase">CLIENTE</span>
                            <span className="center w-full h-full text-sm text-muted font-medium uppercase">DESTINO</span>
                            <span className="center w-full h-full text-sm text-muted font-medium uppercase">FECHA DE VIAJE</span>
                            <span className="center w-full h-full text-sm text-muted font-medium uppercase">TOTAL</span>
                            <span className="center w-full h-full text-sm text-muted font-medium uppercase">ESTADO</span>
                            <span className="center w-full h-full text-sm text-muted font-medium uppercase">ACCIONES</span>
                        </li>
                        <ListBooks books={bookings} loading={bookingsLoading} filter={filter} />
                    </ul>
                </div>

                {viewForm && ( <FormNewBook close={toggleNewForm}/> )}

            </div>

        </>
    )
}