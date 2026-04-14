'use client';

import FormEditClient from "@/components/clients/FormEditClient";
import FormNewClient from "@/components/clients/FormNewClient";
import ListClients from "@/components/clients/ListClients";
import { useClients } from "@/hooks/useClients";
import { IconChevronLeft, IconChevronRight, IconStar, IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";
export default function Page () {

    const { clients, loading, addClient, editClient, removeClient } = useClients();

    const [ newClient, setNewClient ] = useState(false);
    const [ formEditClient, setFormEditClient ] = useState({
        view: false,
        data: null
    });

    const toogleClientForm = () => setNewClient(!newClient);
    const toogleEditForm = (data) => setFormEditClient(prev => ({...prev, view: !prev.view, data}));

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Directorio de clientes</h1>
                    <p className="text-sm text-muted">Gestiona tu cartera de viajeros de lujo y cuentas corporativas.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap" onClick={toogleClientForm}><IconUserPlus/> Nuevo cliente</button>
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

            <div className="w-full flex items-start gap-md">
                <div className="w-full rounded-md overflow-hidden border">
                    <ul className="w-full flex flex-col bg-surface">
                        <li className="w-full h flex items-center justify-between text-sm text-muted font-bold bg-neutral" style={{"--h": "40px"}}>
                            <span className="w-full h flex items-center justify-center">NOMBRE</span>
                            <span className="w-full h flex items-center justify-center">EMAIL</span>
                            <span className="w-full h flex items-center justify-center">TELÉFONO</span>
                            <span className="w-full h flex items-center justify-center">TIPO</span>
                            <span className="w-full h flex items-center justify-center">FUENTE</span>
                            <span className="w-full h flex items-center justify-center">ACCIONES</span>
                        </li>
                        <ListClients clients={clients} loading={loading} openEdit={toogleEditForm} remove={removeClient} />
                    </ul>
                    <div className="w-full flex items-center justify-between bg-surface p-md">
                        <p className="text-xs text-muted">Mostrando <b>1 - {clients.length}</b> de {clients.length} clientes</p>
                        {clients.length > 10 && (
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
                {newClient && ( <FormNewClient toggle={toogleClientForm} add={addClient} /> )}
                {formEditClient.view && ( <FormEditClient toggle={toogleEditForm} data={formEditClient.data} edit={editClient} /> )}
            </div>

        </>
    )
}