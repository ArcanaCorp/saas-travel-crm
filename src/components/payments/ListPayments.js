import ListSkeleton from "../Skeleton/ListSkeleton";
import RowPayment from "./RowPayment";

export default function ListPayments ({ pays, loading, edit }) {

    if (loading) return <ListSkeleton cols={6} width={120} height={20} />;

    if (pays.length === 0) return <li className="w-full h flex items-center justify-center font-medium text-muted uppercase" style={{"--h": "60px"}}>No hay pagos registrados</li>;

    return (

        pays.map((pay) => (
            <RowPayment key={pay.id} pay={pay} edit={edit} />
        ))

    )

}