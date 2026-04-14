export const formatQuote = (quote, clients, packages) => {
    const client = clients.find(c => c.id === quote.client_id);
    const pack = packages.find(p => p.id === quote.package_id);

    return {
        ...quote,
        clients: client || null,
        packages: pack || null
    };
};

export const statusTextQuote = {
    'draft': 'Borrador',
    'sent': 'Enviado',
    'reserved': 'Reservado'
}

export const statusStyle = {
    'draft': 'badge-info',
    'sent': 'badge-warning',
    'reserved': 'badge-success'
}