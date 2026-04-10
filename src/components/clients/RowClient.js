import { IconDots } from "@tabler/icons-react";
import ClientGroup from "../ClientGroup";

export default function RowClient () {
    return (
        <li className="w-full h flex items-center justify-between" style={{"--h": "60px"}}>
            <div className="w-full">
                <ClientGroup/>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-sm text-muted">alejandro12@gmail.com</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-sm text-muted">+51 984 264 125</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs">Frecuente</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <button className="center w h rounded-sm" style={{"--w": "35px", "--h": "35px", "--mnw": "35px"}}><IconDots/></button>
            </div>
        </li>
    )
}