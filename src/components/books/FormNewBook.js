'use client';

import { useState } from "react";

export default function FormNewBook () {

    const [ step, setStep ] = useState(1)

    return (

        <form className="w-full p-md flex flex-col gap-md">
            {step === 1 && (
                <>
                    <div className="w-full">
                        <label className="block text-muted text-sm font-medium mb-xs">Nombre del cliente</label>
                        <input type="text" className="w-full h border rounded-md px-sm" style={{"--h": "48px"}} placeholder="Nombre del cliente" />
                    </div>
                    <div className="w-full">
                        <label className="block text-muted text-sm font-medium mb-xs">Número del cliente</label>
                        <input type="number" className="w-full h border rounded-md px-sm" style={{"--h": "48px"}} placeholder="Número del cliente" />
                    </div>
                    <div className="w-full">
                        <label className="block text-muted text-sm font-medium mb-xs">Correo del cliente</label>
                        <input type="email" className="w-full h border rounded-md px-sm" style={{"--h": "48px"}} placeholder="Correo del cliente" />
                    </div>
                </>
            )}
            <div className="w-full flex items-center justify-between">
                <button className="btn btn-block btn-primary">Siguiente</button>
            </div>
        </form>

    )

}