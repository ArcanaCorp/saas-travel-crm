import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function ListSkeleton ({ cols, width, height }) {
    return (
        <li className="w-full h flex items-center justify-between px-sm" style={{"--h": "60px"}}>
            {Array.from({length: cols}).map((_, i) => ( <Skeleton key={i} width={width} height={height} /> ))}
        </li>
    )
}