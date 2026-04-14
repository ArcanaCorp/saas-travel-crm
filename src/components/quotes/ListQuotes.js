import RowQuote from "./RowQuote";
import ListSkeleton from "../Skeleton/ListSkeleton";

export default function ListQuotes ({ quotes, loading, onEdit }) {

    if (loading) return <ListSkeleton cols={6} width={120} height={20} />;

    if (quotes.length === 0) return <li className="w-full h flex items-center justify-center font-medium text-muted uppercase" style={{"--h": "60px"}}>No hay cotizaciones</li>;

    return (

        quotes.map((quote) => (
            <RowQuote key={quote.id} quote={quote} onEdit={onEdit} />
        ))

    )

}