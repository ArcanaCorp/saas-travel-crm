'use client';

import RowPacks from "./RowPacks";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { usePackages } from "@/hooks/usePackage";

export default function ListPacks ({ packs, loading, refresh }) {

    if (loading) return <Skeleton/>;

    if (!packs.length) return <li className="w-full h flex items-center justify-center" style={{"--h": "60px"}}>No hay paquetes disponibles aún.</li>

    return (

        <>
            {packs.map((pack) => (
                <RowPacks key={pack.id} pack={pack} refresh={refresh} />
            ))}
        </>

    )

}