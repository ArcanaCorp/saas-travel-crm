import ClientGroup from "../ClientGroup";

export default function RowPayment ({ i }) {
    return (
        <li className="w-full h flex items-center justify-between" style={{"--h": "60px"}}>
            <div className="w-full">
                <ClientGroup name="Miguel Angel" subtext="miguelangel@gmail.com" />
            </div>
            <div className="w-full flex items-center justify-center">
                <p className="flex flex-col text-center gap-xs">
                    <span className="text-sm font-medium">Cañon del Shutjo</span>
                    <span className="text-xs text-muted">REF: #8K-992{i}</span>
                </p>
            </div>
            <div className="w-full flex items-center justify-center">
                <p className="font-medium">S/. 120.00</p>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="flex flex-col gap-xs">
                    <div className="w-full h bg-neutral rounded-full overflow-hidden" style={{"--h": "8px"}}>
                        <div className="w h-full bg-success" style={{"--w": `50%`}}></div>
                    </div>
                    <span className="text-xs text-muted">s/. 60.00 (50%)</span>
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs text-success bg-success-transparent rounded-full px-md py-sm">Pagado</span>
            </div>
        </li>
    )
}