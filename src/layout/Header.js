'use client';

import { useAuth } from "@/context/AuthContext";
import { IconBell, IconHelp, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
export default function Header () {

    const { user } = useAuth();
    const message = `Hola ARCANA\n\nTengo un problema o pregunta con el producto de *TravelCRM*.`

    return (

        <header className="w-full h bg-surface h flex items-center justify-between px-md" style={{"--h": "60px"}}>
            <div className="relative w h bg-neutral rounded-md" style={{"--w": "400px", "--h": "45px"}}>
                <span className="absolute center w h" style={{"--w": "45px", "--h": "45px"}}><IconSearch/></span>
                <input type="text" className="w-full h-full bg-none pl-2xl pr-lg" placeholder="Buscar clientes, destinos o reservas..."/>
            </div>
            <div className="flex items-center gap-lg">
                <Link href={`https://wa.me/51966327426/?text=${encodeURIComponent(message)}`} target="_blank" className="center w h rounded-md bg-neutral" style={{"--w": "45px", "--h": "45px"}}><IconHelp/></Link>
                <button className="center w h rounded-md bg-neutral" style={{"--w": "45px", "--h": "45px"}}><IconBell/></button>
                <div className="flex flex-row items-center gap-md px-md">
                    <div className="flex flex-col gap-xs">
                        <h4>{user?.name || user?.email}</h4>
                        <p className="text-xs text-muted text-capitalize">{user?.role}</p>
                    </div>
                    <div className="w h bg-neutral rounded-md border overflow-hidden" style={{"--w": "45px", "--h": "45px"}}>
                        <img src={user?.agency.image || `https://ui-avatars.com/api/?name=Juan+Valer`} width={45} height={45} />
                    </div>
                </div>
            </div>
        </header>

    )

}