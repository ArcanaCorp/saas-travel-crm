export const paymentType = {
    'cancelled': 'Pago cancelado',
    'advance': 'Adelanto'
}

export const paymentMethod = ['Yape', 'BCP', 'BBVA', 'Interbank', 'Plin', 'Efectivo'];

export const getPaymentStats = (payments = []) => {

    const now = new Date();

    let totalIncome = 0;
    let totalPending = 0;
    let overdue = 0;
    let transactions = 0;

    payments.forEach(pay => {

        const amount = Number(pay.amount || 0);
        const remaining = Number(pay.remaining || 0);
        const total = Number(pay.bookings?.total || 0);
        const travelDate = pay.bookings?.travel_date 
            ? new Date(pay.bookings.travel_date) 
            : null;

        // 💰 ingresos
        totalIncome += amount;

        // ⏳ pendiente
        totalPending += remaining;

        // 🔴 vencidos
        if (remaining > 0 && travelDate && travelDate < now) {
            overdue += remaining;
        }

        // 🔄 transacciones (últimos 30 días)
        const created = new Date(pay.created_at);
        const diffDays = (now - created) / (1000 * 60 * 60 * 24);

        if (diffDays <= 30) {
            transactions++;
        }

    });

    return {
        totalIncome,
        totalPending,
        overdue,
        transactions
    };
};