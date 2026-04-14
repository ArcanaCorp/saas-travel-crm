import { formatFromNow } from "@/helpers/formatter";

export default function RowAlerts ({ alert }) {
    return (
        <li key={alert.id} className="w-full flex gap-sm p-sm rounded-md">
            <div className="w h rounded-full bg-neutral" style={{"--w": "60px", "--mnw": "60px", "--h": "60px"}}></div>
            <div>
                <p className="text-sm font-bold">{alert.message}</p>
                <time className="text-xs text-muted">{formatFromNow(alert.date)}</time>
            </div>
        </li>
    )
}