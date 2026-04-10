'use client';

import { useAuth } from "@/context/AuthContext";
import { getAgents, getUserStats } from "@/services/users.service";
import { useEffect, useState, useCallback } from "react";

export const useAgents = () => {

    const { user } = useAuth();

    const [agents, setAgents] = useState([]);
    const [stats, setStats] = useState(null);

    const [loadingAgents, setLoadingAgents] = useState(true);
    const [loadingStats, setLoadingStats] = useState(true);

    // 🔥 traer agentes
    const fetchAgents = useCallback(async () => {
        if (!user?.agency_id) return;

        try {
            setLoadingAgents(true);
            const data = await getAgents(user.agency_id);
            setAgents(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAgents(false);
        }
    }, [user]);

    // 🔥 traer stats
    const fetchStats = useCallback(async () => {
        if (!user?.agency_id) return;

        try {
            setLoadingStats(true);
            const data = await getUserStats(user.agency_id);
            setStats(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingStats(false);
        }
    }, [user]);

    // 🚀 fetch paralelo (más rápido)
    const refreshAll = useCallback(async () => {
        if (!user?.agency_id) return;

        try {
            setLoadingAgents(true);
            setLoadingStats(true);

            const [agentsData, statsData] = await Promise.all([
                getAgents(user.agency_id),
                getUserStats(user.agency_id)
            ]);

            setAgents(agentsData || []);
            setStats(statsData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAgents(false);
            setLoadingStats(false);
        }
    }, [user]);

    // 🔥 carga inicial
    useEffect(() => {
        if (!user?.agency_id) return;
        refreshAll();
    }, [user, refreshAll]);

    return {
        agents,
        stats,

        loadingAgents,
        loadingStats,
        loading: loadingAgents || loadingStats, // 🔥 global

        fetchAgents,
        fetchStats,
        refreshAll, // 🔥 clave

        setAgents,
        setStats
    };
};