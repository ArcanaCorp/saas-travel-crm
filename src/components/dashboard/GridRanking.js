export default function GridRanking ({ summary }) {

    return (

        <>
        
            <div className="w-full bg-surface rounded-md p-md flex flex-col gap-md">
                <div className="flex items-center justify-between">
                    <div className="center w h bg-neutral rounded-md" style={{"--w": "50px", "--h": "50px"}}></div>
                    <span className="bg-tertiary py-xs px-sm rounded-full text-xs text-inverse">+12%</span>
                </div>
                <div className="flex flex-col gap-xs">
                    <p className="text-sm text-muted">Ventas del mes</p>
                    <h3 className="h2">S/. {(summary.monthly_sales).toFixed(2)}</h3>
                </div>
            </div>
            <div className="w-full bg-surface rounded-md p-md flex flex-col gap-md">
                <div className="flex items-center justify-between">
                    <div className="center w h bg-neutral rounded-md" style={{"--w": "50px", "--h": "50px"}}></div>
                    <span className="bg-tertiary py-xs px-sm rounded-full text-xs text-inverse">+12%</span>
                </div>
                <div className="flex flex-col gap-xs">
                    <p className="text-sm text-muted">Leads activos</p>
                    <h3 className="h2">{summary.active_leads}</h3>
                </div>
            </div>
            <div className="w-full bg-surface rounded-md p-md flex flex-col gap-md">
                <div className="flex items-center justify-between">
                    <div className="center w h bg-neutral rounded-md" style={{"--w": "50px", "--h": "50px"}}></div>
                    <span className="bg-tertiary py-xs px-sm rounded-full text-xs text-inverse">+12%</span>
                </div>
                <div className="flex flex-col gap-xs">
                    <p className="text-sm text-muted">Cotizaciones enviadas</p>
                    <h3 className="h2">{summary.quotes_sent}</h3>
                </div>
            </div>
            <div className="w-full bg-surface rounded-md p-md flex flex-col gap-md">
                <div className="flex items-center justify-between">
                    <div className="center w h bg-neutral rounded-md" style={{"--w": "50px", "--h": "50px"}}></div>
                    <span className="bg-tertiary py-xs px-sm rounded-full text-xs text-inverse none">+12%</span>
                </div>
                <div className="flex flex-col gap-xs">
                    <p className="text-sm text-muted">Reservas confirmadas</p>
                    <h3 className="h2">{summary.confirmed_bookings}</h3>
                </div>
            </div>

        </>

    )

}