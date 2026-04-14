'use client';

import { months } from '@/helpers/formatter';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function SummaryChart({ data = [] }) {

    // 📌 Mes actual
    const currentMonth = new Date().getMonth();

    // 📌 Filtrar meses hasta hoy
    const visibleMonths = months.slice(0, currentMonth + 1);

    // 📌 Mapear ventas (data debe venir del backend)
    const salesData = visibleMonths.map((_, index) => {
        const found = data.find(item => item.month === index + 1);
        return found ? found.total : 0;
    });

    // 📊 Configuración del chart
    const chartData = {
        labels: visibleMonths,
        datasets: [
            {
                label: 'Ventas',
                data: salesData,
                borderWidth: 1,
                backgroundColor: visibleMonths.map((_, index) => {
                    return index === currentMonth
                        ? 'rgba(0, 123, 131, 1)'   // ✅ mes actual (verde fuerte)
                        : 'rgba(0,0,0,0.2)'    // resto (gris)
                })
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="w-full h">
            <Bar data={chartData} options={options} />
        </div>
    );
}