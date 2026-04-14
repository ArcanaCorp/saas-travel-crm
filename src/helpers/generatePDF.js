'use client';

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateQuotePDF = (quote, user) => {

    const doc = new jsPDF();

    // 🔥 CONFIG BASE
    const primaryColor = [0, 0, 0]; // negro ARCANA
    const accentColor = [120, 120, 120];

    // 🔹 HEADER (branding)
    doc.setFontSize(18);
    doc.setTextColor(...primaryColor);
    doc.text(user.agency?.name, 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(...accentColor);
    doc.text("Cotización de Viaje", 20, 26);

    doc.text(`Fecha: ${new Date(quote.created_at).toLocaleDateString()}`, 150, 20);
    doc.text(`ID: ${quote.id}`, 150, 26);

    // 🔹 LINEA
    doc.setDrawColor(0);
    doc.line(20, 30, 190, 30);

    // 🔹 CLIENTE
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("CLIENTE", 20, 40);

    doc.setFontSize(10);
    doc.text(`Nombre: ${quote.clients?.name}`, 20, 48);
    doc.text(`Teléfono: ${quote.clients?.phone}`, 20, 54);
    doc.text(`Correo: ${quote.clients?.email || '-'}`, 20, 60);

    // 🔹 DETALLE VIAJE
    doc.text("DETALLE DEL VIAJE", 20, 75);

    doc.text(`Destino: ${quote.packages?.name}`, 20, 83);
    doc.text(`Fecha de viaje: ${quote.travel_date}`, 20, 89);
    doc.text(`Pasajeros: ${quote.pax}`, 20, 95);

    // 🔥 TABLA
    autoTable(doc, {
        startY: 105,
        head: [['Concepto', 'Detalle', 'Precio']],
        body: [
            [
                'Paquete',
                quote.packages?.name,
                `S/. ${quote.packages?.price}`
            ],
            [
                'Cantidad (PAX)',
                quote.pax,
                '-'
            ],
            [
                'Total',
                '',
                `S/. ${quote.total}`
            ]
        ],
        theme: 'grid',
        headStyles: {
            fillColor: primaryColor,
            textColor: 255,
            halign: 'center'
        },
        bodyStyles: {
            halign: 'center'
        },
        styles: {
            fontSize: 10
        }
    });

    // 🔹 FOOTER
    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(10);
    doc.setTextColor(...accentColor);

    doc.text("Condiciones:", 20, finalY);
    doc.text("- Precios sujetos a disponibilidad", 20, finalY + 6);
    doc.text("- No incluye gastos personales", 20, finalY + 12);

    doc.text(`Gracias por confiar en ${user?.agency.name}`, 20, finalY + 25);

    // 🔥 DESCARGA
    doc.save(`cotizacion-${quote.id}.pdf`);
};