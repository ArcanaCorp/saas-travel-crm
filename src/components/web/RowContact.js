import { IconArrowsMaximize } from "@tabler/icons-react";

export default function RowContact ({contacts, toogle}) {

    return (

        <li className="w-full h flex items-center justify-between" style={{"--h": "60px"}}>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs font-medium">{contacts.name}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs font-medium">{contacts.email}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs font-medium">{contacts.phone}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <span className="text-xs font-medium">{contacts.package.name}</span>
            </div>
            <div className="w-full flex items-center justify-center">
                <button className="w h center bg-neutral rounded-sm" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={() => toogle(contacts)}><IconArrowsMaximize/></button>
            </div>
        </li>

    )

}