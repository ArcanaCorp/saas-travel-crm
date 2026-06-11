import ListSkeleton from "../Skeleton/ListSkeleton"
import RowContact from "./RowContact";

export default function ListContacts ({ contacts, loading, toogle }) {
    
    if (loading) return <ListSkeleton cols={5} width={120} height={20} />;

    if (contacts.length === 0) return <li className="w-full h flex items-center justify-center font-medium text-muted uppercase" style={{"--h": "60px"}}>No hay mensajes registrados</li>;
    
    return (
        contacts.map((contact) => (
            <RowContact key={contact.id} contacts={contact} toogle={toogle} />
        ))
    )
}