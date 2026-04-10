import { IconDots } from "@tabler/icons-react";
import ClientGroup from "../ClientGroup";

export default function RowUser ({ agente }) {

    return (
        <li className="w-full h flex items-center justify-between" style={{"--h": "60px"}}>
            <div className="w-full px-xs">
                <ClientGroup picture={false} name={agente?.name} subtext={agente?.email} />
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs font-medium px-md py-sm rounded-md bg-neutral">{agente?.role}</span>
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full flex flex-col gap-xs">
                    <p className="w-full flex items-center justify-between">
                        <span className="text-xs text-muted">0 leads</span>
                        <span className="text-xs text-muted">0%</span>
                    </p>
                    <div className="w-full h rounded-full overflow-hidden bg-neutral" style={{"--h": "8px"}}>
                        <div className="w h-full bg-success" style={{"--w": `0%`}}></div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <p className="flex items-center gap-xs text-xs text-success"><span className="center w h bg-success rounded-full" style={{"--w": "8px", "--h": "8px"}}></span> Online</p>
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <button className="center w h rounded-md bg-neutral" style={{"--w": "35px", "--h": "35px"}}><IconDots/></button>
            </div>
        </li>
    )
}