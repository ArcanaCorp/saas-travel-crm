import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function CardSkeleton () {
    return (
        <div className="w-full bg-surface p-md rounded-md">
            <Skeleton width={50} height={50}/>
            <Skeleton width={'60%'} height={10}/>
            <Skeleton width={'20%'} height={10}/>
        </div>
    )
}