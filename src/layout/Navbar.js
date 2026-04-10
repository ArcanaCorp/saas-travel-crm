'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconBox, IconCalendar, IconCash, IconHelp, IconLayout2, IconLogout, IconPlus, IconReportMoney, IconSettings, IconUserPlus, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/services/auth.service";
import { toast } from "sonner";

export default function Navbar () {

    const location = usePathname();
    const { user } = useAuth();
    const  router = useRouter();

    const handleLogout = () => {

        const promise = signOut();

        toast.promise(promise, {
            loading: "Cerrando sesión...",
            success: () => {
                router.push("/");
                return "Sesión cerrada";
            },
            error: "Error al cerrar sesión",
        });

    };

    return (

        <nav className="w h-screen bg-surface p-md flex flex-col justify-between" style={{"--w": "300px", "--mnw": "300px"}}>
            <div className="w-full flex flex-col">
                <h1 className="text-xl">{user?.agency.name || 'TravelCRM'}</h1>
                <p className="text-xs text-muted">TravelCRM</p>
            </div>
            <ul className="flex w-full flex-col gap-sm">
                <li className="w-full"><Link className={`flex items-center gap-sm w-full h rounded-md text-sm px-sm ${location === '/dashboard' ? 'text-brand font-medium bg-neutral' : 'bg-hover'}`} style={{"--h": "48px"}} href={'/dashboard'}><IconLayout2/> Dashboard</Link></li>
                <li className="w-full"><Link className={`flex items-center gap-sm w-full h rounded-md text-sm px-sm ${location === '/dashboard/clients' ? 'text-brand font-medium bg-neutral' : 'bg-hover'}`} style={{"--h": "48px"}} href={'/dashboard/clients'}><IconUsersGroup/> Clientes</Link></li>
                <li className="w-full"><Link className={`flex items-center gap-sm w-full h rounded-md text-sm px-sm ${location === '/dashboard/leads' ? 'text-brand font-medium bg-neutral' : 'bg-hover'}`} style={{"--h": "48px"}} href={'/dashboard/leads'}><IconUserPlus/> Leads</Link></li>
                <li className="w-full"><Link className={`flex items-center gap-sm w-full h rounded-md text-sm px-sm ${location === '/dashboard/quotes' ? 'text-brand font-medium bg-neutral' : 'bg-hover'}`} style={{"--h": "48px"}} href={'/dashboard/quotes'}><IconReportMoney/> Cotizaciones</Link></li>
                <li className="w-full"><Link className={`flex items-center gap-sm w-full h rounded-md text-sm px-sm ${location === '/dashboard/books' ? 'text-brand font-medium bg-neutral' : 'bg-hover'}`} style={{"--h": "48px"}} href={'/dashboard/books'}><IconCalendar/> Reservas</Link></li>
                <li className="w-full"><Link className={`flex items-center gap-sm w-full h rounded-md text-sm px-sm ${location === '/dashboard/payments' ? 'text-brand font-medium bg-neutral' : 'bg-hover'}`} style={{"--h": "48px"}} href={'/dashboard/payments'}><IconCash/> Pagos</Link></li>
                <li className="w-full"><Link className={`flex items-center gap-sm w-full h rounded-md text-sm px-sm ${location === '/dashboard/packs' ? 'text-brand font-medium bg-neutral' : 'bg-hover'}`} style={{"--h": "48px"}} href={'/dashboard/packs'}><IconBox/> Paquetes</Link></li>
                <li className="w-full"><Link className={`flex items-center gap-sm w-full h rounded-md text-sm px-sm ${location === '/dashboard/users' ? 'text-brand font-medium bg-neutral' : 'bg-hover'}`} style={{"--h": "48px"}} href={'/dashboard/users'}><IconUsers/> Usuarios</Link></li>
                <li className="w-full"><Link className={`flex items-center gap-sm w-full h rounded-md text-sm px-sm ${location === '/dashboard/settings' ? 'text-brand font-medium bg-neutral' : 'bg-hover'}`} style={{"--h": "48px"}} href={'/dashboard/settings'}><IconSettings/> Configuración</Link></li>
            </ul>
            <div className="flex flex-col gap-xs">
                <button className="w-full h rounded-md bg-primary text-inverse flex items-center justify-center gap-xs" style={{"--h": "48px"}}><IconPlus/> Nuevo Lead</button>
                <button className="w-full h rounded-md bg-error-transparent text-error flex items-center justify-center gap-xs" style={{"--h": "48px"}} onClick={handleLogout}><IconLogout/> Cerrar sesión</button>
            </div>
        </nav>

    )

}