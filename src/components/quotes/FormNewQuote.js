export default function FormNewQuote () {
    return (
        <form className="w-full p-md flex flex-col gap-md">
            <div className="w-full">
                <label className="block text-muted text-sm font-medium mb-xs">Nombre del cliente</label>
                <input type="text" className="w-full h border rounded-md px-sm" style={{"--h": "48px"}} placeholder="Nombre del cliente" />
            </div>
            <div className="w-full">
                <label className="block text-muted text-sm font-medium mb-xs">Destino del cliente</label>
                <select className="w-full h border rounded-md px-sm" style={{"--h": "48px"}}>
                    <option value={''} hidden>Destino del cliente</option>
                    <option>Cañon del Shutjo</option>
                    <option>Laguna de Paca</option>
                    <option>Pullas de Raimondi</option>
                    <option>Bosque de Pinos</option>
                    <option>Valle del Mantaro</option>
                </select>
            </div>
            <div className="w-full flex gap-xs">
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Inicio de Viaje</label>
                    <input type="date" className="w-full h border rounded-md px-sm" style={{"--h": "48px"}} />
                </div>
                <div className="w-full">
                    <label className="block text-muted text-sm font-medium mb-xs">Fin de Viaje</label>
                    <input type="date" className="w-full h border rounded-md px-sm" style={{"--h": "48px"}} />
                </div>
            </div>
            <div className="w-full">
                <label className="block text-muted text-sm font-medium mb-xs">Número de Viajeros</label>
                <input type="number" className="w-full h border rounded-md px-sm" style={{"--h": "48px"}} min={1} placeholder="Número de Viajeros" />
            </div>
            <div className="w-full flex items-center justify-between">
                <p className="text-muted uppercase font-medium">Total Estimado</p>
                <p className="text-xl font-medium">S/. 1,200.00</p>
            </div>
            <div className="w-full flex gap-xs">
                <button className="btn btn-block btn-primary">Exportar PDF</button>
                <button className="btn btn-block btn-outline">Borrador</button>
            </div>
        </form>
    )
}