import { clientDB } from '@/libs/supabase';

export const getLandingKPIs = async (agencyId) => {

    const { data, error } = await clientDB
        .from('landing_views')
        .select('*')
        .eq('agency_id', agencyId);

    if (error) throw error;

    const totalViews = data.length;

    const uniqueVisitors = new Set(
        data.map(item => item.device_id)
    ).size;

    const uniqueReturningVisitors = new Set(
        data
            .filter(view =>
                data.filter(
                    item => item.device_id === view.device_id
                ).length > 1
            )
            .map(item => item.device_id)
    ).size;

    const returningRate = uniqueVisitors
        ? ((uniqueReturningVisitors / uniqueVisitors) * 100).toFixed(1)
        : 0;

    const whatsappClicks = data.filter(
        item => item.whatsapp_click
    ).length;

    const formSubmits = data.filter(
        item => item.form_submit
    ).length;

    const avgStay = data.length
        ? Math.round(
            data.reduce(
                (acc, cur) => acc + (cur.stay_seconds || 0),
                0
            ) / data.length
        )
        : 0;

    const conversionRate = uniqueVisitors
        ? (
            ((whatsappClicks + formSubmits) / uniqueVisitors) *
            100
        ).toFixed(1)
        : 0;

    return [
        {
            title: 'Visitantes Únicos',
            value: uniqueVisitors,
            growth: 0,
            icon: 'users'
        },
        {
            title: 'Tasa de Conversión',
            value: `${conversionRate}%`,
            growth: 0,
            icon: 'target'
        },
        {
            title: 'Clics en WhatsApp',
            value: whatsappClicks,
            growth: 0,
            icon: 'whatsapp'
        },
        {
            title: 'Formularios Enviados',
            value: formSubmits,
            growth: 0,
            icon: 'send'
        },
        {
            title: 'Visitas Totales',
            value: totalViews,
            growth: 0,
            icon: 'eye'
        },
        {
            title: 'Retorno',
            value: `${returningRate}%`,
            growth: 0,
            icon: 'repeat'
        },
        {
            title: 'Tiempo Promedio',
            value: `${avgStay}s`,
            growth: 0,
            icon: 'clock'
        }
    ];
};