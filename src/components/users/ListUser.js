'use client';

import RowUser from "./RowUser";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function ListUser ({ agents, loading, update, refresh }) {

    if (loading) {
        return <Skeleton/>;
    }

    if (!agents.length) {
        return <p className="text-muted">No hay agentes aún</p>;
    }

    return (

        <>
            {agents.map((agent) => (
                <RowUser key={agent.id} agente={agent} update={update} refresh={refresh} />
            ))}
        </>

    )

}