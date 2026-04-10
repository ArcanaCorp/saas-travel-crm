'use client';

import { useEffect, useState } from "react";
import RowUser from "./RowUser";
import { useAuth } from "@/context/AuthContext";
import { getAgents } from "@/services/users.service";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function ListUser () {

    const { user } = useAuth();

    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.agency_id) return;

        const fetchAgents = async () => {
            try {
                const data = await getAgents(user.agency_id);
                setAgents(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, [user])

    if (loading) {
        return <Skeleton/>;
    }

    if (!agents.length) {
        return <p className="text-muted">No hay agentes aún</p>;
    }

    return (

        <>
            {agents.map((agent) => (
                <RowUser key={agent.id} agente={agent} />
            ))}
        </>

    )

}