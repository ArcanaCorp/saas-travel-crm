import ListSkeleton from "../Skeleton/ListSkeleton";
import RowBook from "./RowBook";

export default function ListBooks ({ books, loading, filter }) {

    if (loading) return <ListSkeleton cols={6} width={120} height={20} />;

    if (books.length === 0) return <li className="w-full h flex items-center justify-center text-muted text-xs uppercase" style={{"--h": "60px"}}>No hay reservas disponibles aún.</li>;

    return (

        books.map((book) => (
            <RowBook key={book.id} book={book} filter={filter} />
        ))

    )

}