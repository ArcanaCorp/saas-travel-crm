'use client';

import { useState } from "react";
import { IconDots } from "@tabler/icons-react";
import CardLead from "./CardLead";

const STATUS = {
    new: { label: 'NUEVO', color: 'info' },
    quoted: { label: 'COTIZADO', color: 'warning' },
    negotiation: { label: 'NEGOCIACIÓN', color: 'success' }
};

const groupLeads = (leads = []) => {
    return leads.reduce((acc, lead) => {
        const key = lead.status || 'new';
        if (!acc[key]) acc[key] = [];
        acc[key].push(lead);
        return acc;
    }, {});
};

export default function Table({ leads = [], onChangeStatus }) {

    const [dragged, setDragged] = useState(null);

    const grouped = groupLeads(leads);

    const handleDragStart = (lead) => {
        setDragged(lead);
    };

    const handleDrop = (status) => {
        if (!dragged) return;

        // 🔥 Actualizar estado local (optimista)
        onChangeStatus?.(dragged.id, status);

        setDragged(null);
    };

    return (
        <div className="w-full flex gap-md">

            {Object.entries(STATUS).map(([key, config]) => (

                <div
                    key={key}
                    className="w-full flex flex-col gap-md"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(key)}
                >
                    {/* HEADER */}
                    <div className="w-full flex items-center justify-between">
                        <div className="flex gap-xs items-center">
                            <div className={`w h bg-${config.color} rounded-full`} style={{ "--w": "8px", "--h": "24px" }}></div>
                            <h4>{config.label}</h4>
                        </div>
                        <button className="center w h rounded-sm bg-none" style={{ "--w": "35px", "--h": "35px" }}><IconDots /></button>
                    </div>

                    {/* LIST */}
                    <ul className="w-full flex flex-col gap-md min-h-[100px]">
                        {(grouped[key] || []).map((lead) => (
                            <li key={lead.id} draggable onDragStart={() => handleDragStart(lead)}>
                                <CardLead data={lead} />
                            </li>
                        ))}
                    </ul>

                </div>

            ))}

        </div>
    );
}