import Skeleton from "react-loading-skeleton";
import RowClient from "./RowClient";
import 'react-loading-skeleton/dist/skeleton.css'

export default function ListClients ({ clients, loading, remove, openEdit }) {

    if (loading) return <li className="w-full h flex items-center justify-between px-sm" style={{"--h": "60px"}}>{Array.from({length: 6}).map((_, i) => ( <Skeleton key={i} width={180} height={20} /> ))}</li>;

    return (

        clients.map((client) => (
            <RowClient key={client.id} client={client} remove={remove} openEdit={openEdit} />
        ))

    )

}