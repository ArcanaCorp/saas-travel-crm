import { IconEye, IconLock, IconMail } from "@tabler/icons-react";
import Link from "next/link";

export default function Page () {
    return (
        <div className="w m-auto" style={{"--w": "60%"}}>
            <h1>Reestablecer contraseña</h1>
            <p className="text-sm text-muted">Ingresa tus credenciales para acceder al panel de administración.</p>

            <form className="w-full flex flex-col gap-md my-lg">
                <div className="w-full">
                    <label className="block mb-md text-sm text-muted font-medium">Correo Electrónico</label>
                    <div className="w-full h bg-surface rounded-sm flex" style={{"--h": "48px"}}>
                        <span className="center w h" style={{"--w": "48px", "--h": "48px"}}><IconMail/></span>
                        <input type="email" className="w-full h-full" placeholder="Ingresa tu correo electrónico" />
                    </div>
                </div>
                <div className="w-full">
                    <p className="flex items-center justify-between mb-md">
                        <label className="text-sm text-muted font-medium">Contraseña</label>
                        <Link href={'/recover-password'} className="text-sm text-brand">¿Olvidaste tu contraseña?</Link>
                    </p>
                    <div className="w-full h bg-surface rounded-sm flex" style={{"--h": "48px"}}>
                        <span className="center w h" style={{"--w": "48px", "--h": "48px"}}><IconLock/></span>
                        <input type="email" className="w-full h-full" placeholder="Ingresa tu contraseña" />
                        <span className="center w h" style={{"--w": "48px", "--h": "48px", "cursor": "pointer"}}><IconEye/></span>
                    </div>
                </div>
                <div className="w-full">
                    <label className="flex items-center gap-sm text-muted text-sm"><input type="checkbox" className="w h border" style={{"--w": "20px", "--h": "20px"}}/>Mantener la sesión iniciada</label>
                </div>
                <div className="w-full">
                    <button className="w-full h bg-primary text-inverse rounded-md" style={{"--h": "48px"}}>Iniciar Sesión</button>
                </div>
                <div className="w-full h bg-secondary" style={{"--h": "1px"}}></div>
                <button className="w-full h bg-surface rounded-md border" style={{"--h": "48px"}}>Iniciar Sesión con Google</button>
            </form>

            <ul className="w-full flex items-center justify-center gap-md">
                <li><Link href={'/'} className="text-sm text-muted font-medium uppercase">PRIVACIDAD</Link></li>
                <li><Link href={'/'} className="text-sm text-muted font-medium uppercase">TÉRMINOS</Link></li>
                <li><Link href={'/'} className="text-sm text-muted font-medium uppercase">SOPORTE TÉCNICO</Link></li>
                <li><Link href={'/'} className="text-sm text-muted font-medium uppercase">TRAVELCRM</Link></li>
            </ul>
        </div>
    )
}