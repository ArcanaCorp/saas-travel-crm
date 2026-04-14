'use client';

import ListSkeleton from "../Skeleton/ListSkeleton";
import RowPacks from "./RowPacks";

export default function ListPacks ({ packs, loading, refresh }) {

    if (loading) return <ListSkeleton cols={5} width={120} height={20}/>;

    if (!packs.length) return <li className="w-full h flex items-center justify-center" style={{"--h": "60px"}}>No hay paquetes disponibles aún.</li>;

    return (

        packs.map((pack) => (
            <RowPacks key={pack.id} pack={pack} refresh={refresh} />
        ))

    )

}