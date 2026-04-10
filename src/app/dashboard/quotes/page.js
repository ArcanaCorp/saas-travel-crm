'use client';

import FormNewQuote from "@/components/quotes/FormNewQuote";
import RowQuote from "@/components/quotes/RowQuote";
import { IconBulbFilled, IconChevronLeft, IconChevronRight, IconFilter2, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function Page () {

    const [ viewForm, setViewForm ] = useState(false);

    return (
        <>

            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Gestión de Cotizaciones</h1>
                    <p className="text-sm text-muted">Crea y administra las propuestas personalizadas para tus viajeros.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap"><IconFilter2/> Filtrar</button>
                    <button className="btn btn-block flex gap-xs btn-outline text-nowrap" onClick={() => setViewForm(true)}><IconPlus/> Nueva Cotización</button>
                </div>
            </div>

            <div className="w-full flex gap-md my-lg items-start">

                <div className="w-full flex flex-col gap-md">

                    <div className="w-full bg-surface rounded-md border overflow-hidden">
                        <div className="flex items-center justify-between p-md">
                            <h3>Cotizaciones Recientes</h3>
                            <p className="flex gap-xs text-xs text-muted items-center"><span className="block w h rounded-full bg-success" style={{"--w": "10px", "--mnw": "10px", "--h": "10px"}}></span> Actualizado hace 2 minutos</p>
                        </div>
                        <ul className="w-full flex flex-col">
                            <li className="w-full h bg-neutral flex items-center justify-between" style={{"--h": "60px"}}>
                                <span className="center w-full h-full text-sm text-muted font-medium">CLIENTE</span>
                                <span className="center w-full h-full text-sm text-muted font-medium">DESTINO</span>
                                <span className="center w-full h-full text-sm text-muted font-medium">TOTAL</span>
                                <span className="center w-full h-full text-sm text-muted font-medium">ESTADO</span>
                            </li>
                            {Array.from({length: 8}).map((_, i) => (
                                <RowQuote key={i} i={i} />
                            ))}
                        </ul>
                        <div className="w-full flex items-center justify-between bg-surface p-md">
                            <p className="text-xs text-muted">Mostrando <b>8 de 124</b> cotizaciones</p>
                            <div className="flex gap-xs">
                                <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}><IconChevronLeft/></button>
                                <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>1</button>
                                <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>2</button>
                                <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>3</button>
                                <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}><IconChevronRight/></button>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full gap-md">
                        <div className="w-full bg-surface rounded-md border p-md flex flex-col gap-sm">
                            <p className="text-sm text-muted uppercase font-medium">Tasa de conversación</p>
                            <h2>64% <span className="text-xs text-success">+4.2% este mes</span></h2>
                            <div className="w-full h rounded-full overflow-hidden bg-neutral" style={{"--h": "15px"}}>
                                <div className="w h-full bg-success" style={{"--w": `${'64%'}`}}></div>
                            </div>
                        </div>
                        <div className="w-full bg-surface rounded-md border p-md flex flex-col gap-sm">
                            <p className="text-sm text-muted uppercase font-medium">Valor promedio</p>
                            <h2>S/ 64.00 <span className="text-xs text-success">PEN por cotización</span></h2>
                            <p className="text-xs text-muted">Basado en las últimas 50 ventas cerradas</p>
                        </div>
                    </div>

                </div>
                
                {viewForm && (
                    <div className="w flex flex-col gap-md" style={{"--w": "350px", "--mnw": "350px"}}>
                        <div className="w bg-surface border rounded-md" style={{"--w": "350px", "--mnw": "350px"}}>
                            <div className="flex items-center justify-between p-md">
                                <h3>Crear cotización</h3>
                                <button className="center w h rounded-full" style={{"--w": "30px", "--mnw": "30px", "--h": "30px"}} onClick={() => setViewForm(false)}><IconX size={18}/></button>
                            </div>
                            <FormNewQuote/>
                        </div>
                        <div className="w-full flex gap-sm text-success bg-success-transparent p-md rounded-md border-success">
                            <div className="center w h rounded-full border-success" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>
                                <IconBulbFilled className="text-success"/>
                            </div>
                            <div className="flex flex-col gap-xs">
                                <h4>Tip del conserje</h4>
                                <p className="text-sm">Las cotizaciones a Cañon del Shutjo han subido un 15% este mes.</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </>
    )
}