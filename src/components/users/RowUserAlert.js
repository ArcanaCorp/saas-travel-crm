import { IconLogout } from "@tabler/icons-react";

export default function RowUserAlert () {

    return (
        <li className="w-full flex items-center gap-sm">
            <div className="center w h rounded-md bg-neutral" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}><IconLogout/></div>
            <div className="flex flex-col gap-xs">
                <p className="text-sm text-muted"><b className="text-primary">Lucia Torres</b> inició sesión.</p>
                <p className="text-xs text-muted">hace 12 minutos · IP: 192.168.8.12</p>
            </div>
        </li>
    )

}