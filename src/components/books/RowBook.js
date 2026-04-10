import ClientGroup from "../ClientGroup";

export default function RowBook () {

    return (

        <li className="w-full h flex items-center justify-between" style={{"--h": "60px"}}>
            <div className="w-full">
                <ClientGroup/>
            </div>
            <div className="w-full flex items-center justify-center">
                <p className="flex flex-col text-center">
                    <span className="text-xs">Cañon de Shutjo</span>
                    <span className="text-xs text-muted">Relax · 8 DÍAS</span>
                </p>
            </div>
            <div className="w-full flex items-center justify-center">
                <p className="flex flex-col text-center">
                    <span className="text-xs">12 Feb, 2026</span>
                    <span className="text-xs text-muted">#TRV-001</span>
                </p>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs text-success bg-success-transparent px-md py-sm rounded-full font-medium">Confirmado</span>
            </div>
        </li>

    )

}