'use client';

import { signInOrSignUp } from "@/services/auth.service";
import { IconEye, IconEyeClosed, IconLock, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page () {

    const router = useRouter();
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ viewPwd, setViewPwd ] = useState(false)

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            toast.warning('Alerta', { description: 'Completa todos los campos antes de continuar' })
            return;
        }

        try {

            setLoading(true)
            const { user } = await signInOrSignUp(email, password);
            if (user) {
                router.push('/dashboard')
                router.refresh();
            }
            toast.success('Éxito', { description: 'Inicio de sesión éxitoso' })

        } catch (e) {
            toast.error('Error', { description: `Hubo un error inesperado: ${e.message}` })
            console.error(e);
        } finally {
            setLoading(false)
        }
    };

    return (

        <div className="w m-auto flex flex-col justify-between gap-lg" style={{"--w": "60%"}}>
            
            <div className="flex flex-col gap-xs">
                <h1>Bienvenido de nuevo</h1>
                <p className="text-sm text-muted">Ingresa tus credenciales para acceder al panel de administración.</p>
            </div>

            <form className="w-full flex flex-col gap-md my-lg" onSubmit={handleLogin}>
                <div className="w-full">
                    <label className="block mb-md text-sm text-muted font-medium">Correo Electrónico</label>
                    <div className="w-full h bg-surface rounded-sm flex" style={{"--h": "48px"}}>
                        <span className="center w h" style={{"--w": "48px", "--h": "48px"}}><IconMail/></span>
                        <input type="email" className="w-full h-full" value={email} placeholder="Ingresa tu correo electrónico" onChange={(e) => setEmail(e.target.value)} disabled={loading}/>
                    </div>
                </div>
                <div className="w-full">
                    <p className="flex items-center justify-between mb-md">
                        <label className="text-sm text-muted font-medium">Contraseña</label>
                        <Link href={'/recover-password'} className="text-sm text-brand">¿Olvidaste tu contraseña?</Link>
                    </p>
                    <div className="w-full h bg-surface rounded-sm flex" style={{"--h": "48px"}}>
                        <span className="center w h" style={{"--w": "48px", "--h": "48px"}}><IconLock/></span>
                        <input type={viewPwd ? `text` : 'password'} className="w-full h-full" placeholder="Ingresa tu contraseña" onChange={(e) => setPassword(e.target.value)} disabled={loading}/>
                        <span className="center w h" style={{"--w": "48px", "--h": "48px", "cursor": "pointer"}} onClick={() => setViewPwd(!viewPwd)}>{viewPwd ? <IconEyeClosed/> : <IconEye/>}</span>
                    </div>
                </div>
                <div className="w-full">
                    <label className="flex items-center gap-sm text-muted text-sm"><input type="checkbox" className="w h border" style={{"--w": "20px", "--h": "20px"}}/>Mantener la sesión iniciada</label>
                </div>
                <div className="w-full">
                    <button className="w-full h bg-primary text-inverse rounded-md" style={{"--h": "48px"}}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</button>
                </div>
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