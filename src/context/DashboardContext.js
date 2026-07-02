'use client';

import { useAgents } from "@/hooks/useAgents";
import { useBooking } from "@/hooks/useBooking";
import { useClients } from "@/hooks/useClients";
import { useContact } from "@/hooks/useContact";
import { useLanding } from "@/hooks/useLanding";
import { usePackages } from "@/hooks/usePackage";
import { usePayment } from "@/hooks/usePayment";
import { useQuotes } from "@/hooks/useQuotes";
import { createContext, useContext } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

    const agents = useAgents();
    const clients = useClients();
    const packages = usePackages();
    const quotes = useQuotes();
    const booking = useBooking();
    const payments = usePayment();
    const landing = useLanding();
    const contacts = useContact();

    const refreshAll = async () => {
        await Promise.all([
            agents.fetchAgents(),
            clients.fetchClients(),
            packages.fetchPacks(),
            quotes.fetchQuotes(),
            booking.fetchBookings(),
            payments.fetchPayments(),
            landing.fetchLanding(),
            contacts.fetchContacts()
        ])
    }

    const contextValue = {
        // 🔹 agents
        agents: agents.agents,
        agentsLoading: agents.loading,
        stats: agents.stats,

        // 🔹 clients
        clients: clients.clients,
        clientsLoading: clients.loading,

        // 🔹 quotes
        quotes: quotes.quotes,
        quotesLoading: quotes.loading,

        // 🔹 packages
        packs: packages.packs,
        packagesLoading: packages.loading,

        // 🔹 bookings
        bookings: booking.bookings,
        bookingsLoading: booking.loading,

        // 🔹 payments
        payments: payments.payments,
        paymentsLoading: payments.loading,

        // 🔹 landing
        landing: landing.landing,
        landingLoading: landing.loading,

        contacts: contacts.contacts,
        contactsLoading: contacts.loading,

        // 🔹 actions
        refreshAll,

        // 🔹 mutations (importantísimo)
        addClient: clients.addClient,
        updateClient: clients.editClient,
        removeClient: clients.removeClient,

        addQuote: quotes.addQuote,
        editQuote: quotes.editQuote,
        removeQuote: quotes.removeQuote,

        addPack: packages.addPack,
        updatePack: packages.updatePack,
        removePack: packages.removePack,

        addBook: booking.addBooking,
        editBook: booking.editBooking,
        removeBook: booking.removeBooking,

        addPayment: payments.addPayment,
        editPayment: payments.editPayment,
        removePayment: payments.removePayment,

        setAgents: agents.setAgents
    };

    return (
        <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>
    )

}

export const useDashboard = () => useContext(DashboardContext);