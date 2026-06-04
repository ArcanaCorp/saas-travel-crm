'use client';

import GridRanking from "@/components/web/GridRanking";
import { useDashboard } from "@/context/DashboardContext";

export default function Page () {

    const { landing, landingLoading } = useDashboard();

    return (
        <>

            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-xs">
                    <h1>Página web</h1>
                    <p className="text-sm text-muted">Gestiona tu página web desde un solo lugar.</p>
                </div>
            </div>

            <div className="w-full my-lg">
                <GridRanking landing={landing} loading={landingLoading} />
            </div>

        </>
    )
}