'use client';

import { useAuth } from "@/context/AuthContext";
import RowPacks from "./RowPacks";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { getPackages } from "@/services/packages.service";

export default function ListPacks () {

    const { user } = useAuth();

    const [ packs, setPacks ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (!user?.agency_id) return;
        const fetchPacks = async () => {
            try {
                const data = await getPackages(user?.agency_id);
                setPacks(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPacks();
    }, [user])

    if (loading) return <Skeleton/>;

    if (!packs.length) return <li className="w-full h flex items-center justify-center" style={{"--h": "60px"}}>No hay paquetes disponibles aún.</li>

    return (

        <>
            {packs.map((pack) => (
                <RowPacks key={pack.id} pack={pack} />
            ))}
        </>

    )

}