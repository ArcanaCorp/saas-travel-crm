// ===============================
// 📊 DASHBOARD
// ===============================
export const dashboard = {
    summary: {
        monthly_sales: 4500,
        active_leads: 12,
        quotes_sent: 8,
        confirmed_bookings: 5
    },
    alerts: [
        {
            id: 1,
            message: "Nuevo lead registrado",
            date: "2026-04-10T10:30:00",
        },
        {
            id: 2,
            message: "Reserva confirmada para Cusco",
            date: "2026-04-09T14:20:00",
        },
        {
            id: 3,
            message: "Pago recibido de cliente VIP",
            date: "2026-04-08T09:15:00",
        }
    ]
};

// ===============================
// 👥 CLIENTS
// ===============================
export const clients = [
    {
        id: "c1",
        name: "Juan Pérez",
        email: "juan@gmail.com",
        phone: "987654321",
        origin: "Lima",
        status: "new"
    },
    {
        id: "c2",
        name: "María López",
        email: "maria@gmail.com",
        phone: "912345678",
        origin: "Arequipa",
        status: "frequent"
    },
    {
        id: "c3",
        name: "Carlos Ramos",
        email: "carlos@gmail.com",
        phone: "998877665",
        origin: "Cusco",
        status: "vip"
    }
];

// ===============================
// 🎯 LEADS
// ===============================
export const leads = [
    {
        id: "l1",
        client_name: "Juan Pérez",
        destination: "Cusco",
        priority: "high",
        status: "new",
        agent: "Ana",
        price: 120,
        created_at: "2026-04-10"
    },
    {
        id: "l2",
        client_name: "María López",
        destination: "Machu Picchu",
        priority: "medium",
        status: "quoted",
        agent: "Luis",
        price: 120,
        created_at: "2026-04-09"
    },
    {
        id: "l3",
        client_name: "Carlos Ramos",
        destination: "Ica",
        priority: "low",
        status: "negotiation",
        agent: "Ana",
        price: 120,
        created_at: "2026-04-08"
    }
];

// ===============================
// 🧾 QUOTES (COTIZACIONES)
// ===============================
export const quotes = [
    {
        id: "q1",
        client_name: "Juan Pérez",
        destination: "Cusco",
        travel_date: "2026-05-10",
        people: 2,
        total: 1200,
        status: "sent"
    },
    {
        id: "q2",
        client_name: "María López",
        destination: "Arequipa",
        travel_date: "2026-06-15",
        people: 4,
        total: 2000,
        status: "draft"
    }
];

// ===============================
// 💰 PAYMENTS
// ===============================
export const payments = [
    {
        id: "p1",
        client_name: "Carlos Ramos",
        booking_id: "b1",
        total: 1500,
        type: "full", // full | partial
        status: "paid",
        date: "2026-04-08"
    },
    {
        id: "p2",
        client_name: "Juan Pérez",
        booking_id: "b2",
        total: 500,
        type: "partial",
        status: "pending",
        date: "2026-04-09"
    }
];

// ===============================
// 📅 BOOKINGS (RESERVAS)
// ===============================
export const bookings = [
    {
        id: "b1",
        client_name: "Carlos Ramos",
        destination: "Cusco",
        travel_date: "2026-05-10",
        status: "confirmed"
    },
    {
        id: "b2",
        client_name: "Juan Pérez",
        destination: "Ica",
        travel_date: "2026-05-20",
        status: "pending"
    },
    {
        id: "b3",
        client_name: "María López",
        destination: "Arequipa",
        travel_date: "2026-06-01",
        status: "cancelled"
    }
];

// ===============================
// 📦 PACKAGES (por si lo usas)
// ===============================
export const packages = [
    {
        id: "pk1",
        name: "Tour Cusco 3 días",
        description: "Incluye hotel + tours",
        price: 800,
        duration: "3 días",
        capacity: 10,
        status: "active"
    },
    {
        id: "pk2",
        name: "Full Day Ica",
        description: "Huacachina + viñedos",
        price: 150,
        duration: "1 día",
        capacity: 20,
        status: "inactive"
    }
];