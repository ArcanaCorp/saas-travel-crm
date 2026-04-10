'use client';

import FormNewPackage from "@/components/packs/FormNewPackage";
import ListPacks from "@/components/packs/ListPacks";
import { usePackages } from "@/hooks/usePackage";
import { IconFilter2, IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function Page () {

    const { packs, loading, fetchPacks } = usePackages();

    const [ viewNewPackage, setViewNewPackage ] = useState(false);

    const handleTooglePackage = () => setViewNewPackage(!viewNewPackage);

    return (
        <>

            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Catálogo de paquetes</h1>
                    <p className="text-sm text-muted">Gestiona y personaliza tu inventario de experiencias premium.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap" onClick={handleTooglePackage}><IconPlus/> Nuevo Paquete</button>
                </div>
            </div>

            <div className="w-full flex items-start gap-md my-lg">
                <div className="w-full bg-surface border rounded-md overflow-hidden">
                    <div className="w-full flex items-center justify-between p-md">
                        <h2>Tours & Experiencias</h2>
                        <div className="flex gap-xs">
                            <div className="relative w h bg-neutral" style={{"--w": "300px", "--h": "35px"}}>
                                <input type="text" id="searchTours" name="searchTours" className="w-full h-full bg-none pl-xl pr-md" placeholder="Buscar tours y experiencias" />
                                <span className="absolute inset center w h bg-none" style={{"--w": "35px", "--mnw": "35px", "--h": "35px"}}><IconSearch size={18}/></span>
                            </div>
                            <button className="center w h rounded-sm" style={{"--w": "35px", "--mnw": "35px", "--h": "35px"}}><IconFilter2 size={18}/></button>
                        </div>
                    </div>
                    <ul className="w-full flex flex-col">
                        <li className="w-full h bg-neutral flex items-center justify-between" style={{"--h": "60px"}}>
                            <span className="w-full h-full flex items-center justify-center text-xs text-muted font-medium uppercase">Paquete</span>
                            <span className="w-full h-full flex items-center justify-center text-xs text-muted font-medium uppercase">TIPO</span>
                            <span className="w-full h-full flex items-center justify-center text-xs text-muted font-medium uppercase">PRECIO BASE</span>
                            <span className="w-full h-full flex items-center justify-center text-xs text-muted font-medium uppercase">ESTADO</span>
                            <span className="w-full h-full flex items-center justify-center text-xs text-muted font-medium uppercase">ACCIONES</span>
                        </li>
                        <ListPacks packs={packs} loading={loading} refresh={fetchPacks}/>
                    </ul>
                </div>
                {viewNewPackage && (
                    <div className="w bg-surface border rounded-md p-md" style={{"--w": "400px", "--mnw": "400px"}}>
                        <div className="w-full flex items-center justify-between">
                            <h3>Nuevo paquete</h3>
                            <button className="center w h rounded-full" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={handleTooglePackage}><IconX/></button>
                        </div>
                        <FormNewPackage handleToogle={handleTooglePackage} refresh={fetchPacks} />
                    </div>
                )}
            </div>

        </>
    )
}