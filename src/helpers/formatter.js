import moment from 'moment';
import 'moment/locale/es';

// Configurar idioma global
moment.locale('es');

export const rolesName = {
    'admin': 'Administrador',
    'agent': 'Agente',
    'view': 'Visor'
}

export const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export const statusClient = {
    'new': 'Nuevo',
    'frequent': 'Frecuente',
    'vip': 'VIP'
}

export const SOURCE_OPTIONS = [
    'WhatsApp',
    'Facebook',
    'Instagram',
    'TikTok',
    'Google',
    'Página Web',
    'Recomendación',
    'Publicidad',
    'Volante',
    'Cotización',
    'Otro'
];

export const filterBookings = [
    {key: 'all', value: 'Todos'},
    {key: 'finalized', value: 'Finalizados'},
    {key: 'confirmed', value: 'Confirmados'},
    {key: 'pending', value: 'Pendientes'},
    {key: 'cancelled', value: 'Cancelados'},
]

// Formato tipo: 13 de abril de 2026
export const formatDateLL = (date) => {
    return moment(date).format('ll');
};

// Formato relativo: hace 2 horas, hace 3 días
export const formatFromNow = (date) => {
    return moment(date).fromNow();
};