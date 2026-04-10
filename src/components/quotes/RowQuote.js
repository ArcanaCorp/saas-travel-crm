import { IconMapPin } from "@tabler/icons-react";
import ClientGroup from "../ClientGroup";

export default function RowQuote ({ i }) {
    
    return (

        <li className="w-full h flex items-center justify-between" style={{"--h": "60px"}}>
            <div className="w-full">
                <ClientGroup/>
            </div>
            <div className="flex w-full h-full items-center justify-center">
                <span className="flex text-sm items-center gap-xs"><IconMapPin size={18}/> Canchayllo</span>
            </div>
            <div className="flex w-full h-full items-center justify-center">
                <span className="text-sm">S/ 120.00</span>
            </div>
            <div className="flex w-full h-full items-center justify-center">
                <span className="text-xs bg-success-transparent text-success rounded-full py-sm px-md">Enviada</span>
            </div>
        </li>

    )

}