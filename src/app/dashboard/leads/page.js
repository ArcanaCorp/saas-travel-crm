'use client';

import { IconUserPlus } from "@tabler/icons-react";
import { leads } from "@/db/mock";
import Table from "@/components/leads/Table";

export default function Page () {

    const handleChangeStatus = async (id, status) => {
        try {
            // 🔥 Optimista (UI inmediata)
            setLeads(prev =>
                prev.map(l => l.id === id ? { ...l, status } : l)
            );

            // 🔥 Persistencia en DB
            //await updateLeadStatus(id, status);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Pipeline de Prospectos</h1>
                    <p className="text-sm text-muted">Gestiona el viaje de tus clientes desde el primer contacto.</p>
                </div>
                <div className="flex flex-row gap-xs">
                    <button className="btn btn-block flex gap-xs btn-primary text-nowrap"><IconUserPlus/> Nuevo Lead</button>
                </div>
            </div>

            <div className="w-full flex gap-md justify-between my-lg">
                <Table leads={leads} onChangeStatus={handleChangeStatus} />
            </div>

        </>
    )
}