import CardSkeleton from "../Skeleton/CardSkeleton";
import CardKpi from "./CardKpi";

export default function GridRanking ({ landing, loading }) {
    
    if (loading) return <div className="w-full grid grid-4 gap-sm">{Array.from({length: 4}).map((_, i) => ( <CardSkeleton key={i} /> ))}</div>;
    
    return (
        <div className="w-full grid grid-4 gap-sm my-lg">
            {landing.map((kpi, i) => (
                <CardKpi key={i} data={kpi} />
            ))}
        </div>
    )
}