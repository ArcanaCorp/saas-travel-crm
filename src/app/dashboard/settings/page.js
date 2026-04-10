import FormUpdateAgency from "@/components/settings/FormUpdateAgency";
import FormUpdateProfile from "@/components/settings/FormUpdateProfile";
import Switich from "@/components/Switich";
import { IconCamera } from "@tabler/icons-react";

export default function Page () {
    return (

        <>
            
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Configuración</h1>
                    <p className="text-sm text-muted">Gestiona los detalles de tu cuenta, preferencias y la identidad de tu agencia.</p>
                </div>
            </div>

            <div className="w-full flex gap-md items-start my-lg">

                <div className="w-full flex flex-col gap-md">

                    <div className="w-full bg-surface border rounded-md p-md">
                        <FormUpdateProfile/>
                    </div>

                    <div className="w-full bg-surface border rounded-md p-md">
                        <FormUpdateAgency/>
                    </div>

                </div>

                <div className="w flex flex-col gap-md" style={{"--w": "400px", "--mnw": "400px"}}>

                    <div className="w-full p-md rounded-md bg-surface border">
                        <div className="w-full">
                            <h3>Preferencias</h3>
                        </div>
                        <div className="w-full py-md flex flex-col gap-md">
                            <div className="w-full flex flex-col gap-sm">
                                <label className="block text-sm text-muted font-medium">Idioma de Interfaz</label>
                                <div className="w-full flex gap-sm">
                                    <button className={`w-full py-sm rounded-sm text-xs bg-primary text-inverse`}>Español</button>
                                    <button className={`w-full py-sm rounded-sm text-xs bg-neutral`} style={{"cursor": "no-drop"}} disabled>Inglés</button>
                                    <button className={`w-full py-sm rounded-sm text-xs bg-neutral`} style={{"cursor": "no-drop"}} disabled>Frances</button>
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-sm">
                                <label className="block text-sm text-muted font-medium">Moneda Predeterminada</label>
                                <select className="w-full p-sm border bg-neutral rounded-sm" value={'PEN'} disabled>
                                    <option value={''} hidden>Seleccionar moneda</option>
                                    <option value={'PEN'}>PEN</option>
                                    <option value={'EUR'}>EUR</option>
                                    <option value={'USD'}>USD</option>
                                </select>
                            </div>
                            <div className="w-full flex flex-col gap-sm">
                                <label className="block text-sm text-muted font-medium">Tema de Interfaz</label>
                                <div className="w-full flex gap-sm">
                                    <button className={`w-full py-sm rounded-sm text-xs bg-primary text-inverse`}>Claro</button>
                                    <button className={`w-full py-sm rounded-sm text-xs bg-neutral`} style={{"cursor": "no-drop"}} disabled>Oscuro</button>
                                    <button className={`w-full py-sm rounded-sm text-xs bg-neutral`} style={{"cursor": "no-drop"}} disabled>Sistema</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-md rounded-md bg-surface border none">
                        <div className="w-full">
                            <h3>Notificaciones</h3>
                        </div>
                        <ul className="w-full py-md flex flex-col gap-md">
                            <li className="w-full flex items-center justify-between">
                                <div className="w-full flex flex-col gap-xs">
                                    <h4>Correo Electrónico</h4>
                                    <p className="text-xs text-muted">Resúmenes diarios y leads.</p>
                                </div>
                                <Switich active={true} />
                            </li>
                            <li className="w-full flex items-center justify-between">
                                <div className="w-full flex flex-col gap-xs">
                                    <h4>Notificaciones Push</h4>
                                    <p className="text-xs text-muted">Alertas inmediatas en el navegador.</p>
                                </div>
                                <Switich active={true} />
                            </li>
                            <li className="w-full flex items-center justify-between">
                                <div className="w-full flex flex-col gap-xs">
                                    <h4>Mensajes SMS</h4>
                                    <p className="text-xs text-muted">Urgencias de viajes.</p>
                                </div>
                                <Switich active={false} />
                            </li>
                        </ul>
                    </div>

                    <div className="w-full p-md flex flex-col gap-md rounded-md bg-error-transparent">
                        <h4 className="text-error">Zona de Riesgo</h4>
                        <p className="text-sm text-muted">Eliminar la cuenta es una acción permanente y no se puede deshacer.</p>
                        <button className="w-full h bg-error text-inverse rounded-sm bg-none" style={{"--h": "48px"}}>Desactivar cuenta</button>
                    </div>

                </div>

            </div>

        </>

    )
}