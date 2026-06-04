import { IconBrandWhatsapp, IconClockHour4, IconEye, IconRepeat, IconSend, IconTargetArrow, IconUsers } from "@tabler/icons-react";

export default function CardKpi ({ data }) {

    const icon = {
        'users': <IconUsers/>,
        'target': <IconTargetArrow/>,
        'whatsapp': <IconBrandWhatsapp/>,
        'send': <IconSend/>,
        'eye': <IconEye/>,
        'repeat': <IconRepeat/>,
        'clock': <IconClockHour4/>
    }

    return (
        <div className="w-full bg-surface p-md rounded-md">
            <div className="center w h bg-neutral rounded-md mb-md" style={{"--w": "50px", "--h": "50px"}}>{icon[data?.icon]}</div>
            <h3 className="text-2xl">{data.value} <span className="text-xs">{data.growth}</span></h3>
            <p className="text-muted text-sm">{data.title}</p>
        </div>
    )
}