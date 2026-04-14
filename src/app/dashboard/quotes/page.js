'use client';

import ProgressBar from "@/components/ProgressBar";
import FormEditQuote from "@/components/quotes/FormEditQuote";
import FormNewQuote from "@/components/quotes/FormNewQuote";
import ListQuotes from "@/components/quotes/ListQuotes";
import RankingQuote from "@/components/quotes/RankingQuote";
import { useDashboard } from "@/context/DashboardContext";
import { IconBulbFilled, IconChevronLeft, IconChevronRight, IconDownload, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function Page () {

    const { quotes, quotesLoading } = useDashboard();

    const [ viewForm, setViewForm ] = useState(false);
    const [ editForm, setEditForm ] = useState({view: false, data:null})

    const handleToogleForm = () => setViewForm(!viewForm);
    const handleEditForm = (data) => setEditForm(prev => ({...prev, view: !prev.view, data}))

    return (
        <>

            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Gestión de Cotizaciones</h1>
                    <p className="text-sm text-muted">Crea y administra las propuestas personalizadas para tus viajeros.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap" onClick={() => setViewForm(true)}><IconPlus/> Nueva Cotización</button>
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
                                <span className="center w-full h-full text-sm text-muted font-medium">FECHA</span>
                                <span className="center w-full h-full text-sm text-muted font-medium">TOTAL</span>
                                <span className="center w-full h-full text-sm text-muted font-medium">ESTADO</span>
                                <span className="center w-full h-full text-sm text-muted font-medium">ACCIONES</span>
                            </li>
                            <ListQuotes quotes={quotes} loading={quotesLoading} onEdit={handleEditForm} />
                        </ul>
                        <div className="w-full flex items-center justify-between bg-surface p-md">
                            <p className="text-xs text-muted">Mostrando <b>{quotes.length} de {quotes.length}</b> cotizaciones</p>
                            {quotes.length > 10 && (
                                <div className="flex gap-xs">
                                    <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}><IconChevronLeft/></button>
                                    <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>1</button>
                                    <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>2</button>
                                    <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>3</button>
                                    <button className="center w h bg-surface rounded-md border" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}><IconChevronRight/></button>
                                </div>
                            )}
                        </div>
                    </div>

                    <RankingQuote/>

                </div>
                
                {viewForm && (<FormNewQuote closeForm={handleToogleForm} />)}
                {editForm.view && ( <FormEditQuote closeForm={handleEditForm} data={editForm.data} /> )}

            </div>

        </>
    )
}