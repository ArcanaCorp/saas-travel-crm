# TravelCRM

## Descripción General

TravelCRM es una plataforma digital diseñada para agencias de viajes y turismo, orientada a la gestión eficiente de clientes, paquetes turísticos, equipos de trabajo y operaciones comerciales. Su propósito es centralizar todos los procesos clave del negocio en un solo sistema, facilitando la organización, el control y la toma de decisiones.

La solución está enfocada en mejorar la productividad de las agencias, optimizar la conversión de clientes y ofrecer una experiencia más estructurada en la administración de servicios turísticos.

---

## ¿Qué permite hacer?

TravelCRM permite a las agencias:

* Gestionar paquetes turísticos y experiencias (creación, edición y control)
* Administrar clientes y leads comerciales
* Organizar equipos de trabajo (agentes y roles)
* Supervisar el rendimiento del negocio
* Centralizar la información clave en un solo lugar
* Mantener control sobre operaciones y datos internos

---

## Módulos principales

* **Gestión de Paquetes:** Creación y administración de tours y experiencias
* **Gestión de Usuarios:** Control de agentes, accesos y roles
* **Perfil de Agencia:** Configuración y personalización del negocio
* **Panel de Control:** Visualización de métricas y estado general
* **Leads y Clientes:** Seguimiento de oportunidades comerciales

---

## Propósito

TravelCRM nace con el objetivo de digitalizar y profesionalizar la gestión de agencias de turismo, permitiendo escalar operaciones de forma ordenada y eficiente.

---

## Propiedad y Uso

Este software es propiedad exclusiva de **ARCANA CORP**.

Queda estrictamente prohibido:

* Comercializar, revender o distribuir este sistema sin autorización
* Utilizar el software con fines lucrativos sin consentimiento expreso
* Modificar o replicar el producto para beneficio propio o de terceros

Cualquier uso no autorizado será considerado una violación de propiedad y dará lugar a acciones legales correspondientes.

---

# Database – SaaS Travel CRM

## Tablas creadas

### clients
Almacena los clientes de la agencia.
- id → UUID único autogenerado
- agency_id → agencia a la que pertenece
- name → nombre del cliente
- email → correo del cliente
- phone → teléfono del cliente
- source → origen del cliente (web, referido, etc.)
- status → estado: new | frequent | vip

### quotes
Almacena las cotizaciones de viajes.
- id → UUID único autogenerado
- agency_id → agencia a la que pertenece
- client_name → nombre del cliente
- destination → destino del viaje
- travel_date → fecha de viaje
- pax → cantidad de personas
- total → precio total
- status → estado: draft | sent

### bookings
Almacena las reservas confirmadas.
- id → UUID único autogenerado
- agency_id → agencia a la que pertenece
- client_id → cliente que reservó
- destination → destino del viaje
- travel_date → fecha de viaje
- status → estado: pending | confirmed | cancelled

### payments
Almacena los pagos realizados.
- id → UUID único autogenerado
- agency_id → agencia a la que pertenece
- client_id → cliente que pagó
- booking_id → reserva asociada
- total → monto pagado
- type → tipo: advance | remaining
- status → estado: pending | paid
- paid_at → fecha de pago

## Modificación leads
Se agregaron las siguientes columnas:
- name → nombre del cliente
- destination → destino de interés
- priority → prioridad: low | medium | high
- stage → estado comercial: new | quoted | negotiation

## Relaciones
- clients.agency_id → agencies.id
- bookings.client_id → clients.id
- payments.booking_id → bookings.id
- payments.client_id → clients.id
- leads.agent_id → users.id

## RLS
Todas las tablas tienen políticas de seguridad activadas:
- SELECT, INSERT, UPDATE, DELETE filtrados por agency_id = auth.uid()

# Database – SaaS Travel CRM

## Tablas creadas

### clients
Almacena los clientes de la agencia.
- id → UUID único autogenerado
- agency_id → agencia a la que pertenece
- name → nombre del cliente
- email → correo del cliente
- phone → teléfono del cliente
- source → origen del cliente (web, referido, etc.)
- status → estado: new | frequent | vip

### quotes
Almacena las cotizaciones de viajes.
- id → UUID único autogenerado
- agency_id → agencia a la que pertenece
- client_name → nombre del cliente
- destination → destino del viaje
- travel_date → fecha de viaje
- pax → cantidad de personas
- total → precio total
- status → estado: draft | sent

### bookings
Almacena las reservas confirmadas.
- id → UUID único autogenerado
- agency_id → agencia a la que pertenece
- client_id → cliente que reservó
- destination → destino del viaje
- travel_date → fecha de viaje
- status → estado: pending | confirmed | cancelled

### payments
Almacena los pagos realizados.
- id → UUID único autogenerado
- agency_id → agencia a la que pertenece
- client_id → cliente que pagó
- booking_id → reserva asociada
- total → monto pagado
- type → tipo: advance | remaining
- status → estado: pending | paid
- paid_at → fecha de pago

## Modificación leads
Se agregaron las siguientes columnas:
- name → nombre del cliente
- destination → destino de interés
- priority → prioridad: low | medium | high
- stage → estado comercial: new | quoted | negotiation

## Relaciones
- clients.agency_id → agencies.id
- bookings.client_id → clients.id
- payments.booking_id → bookings.id
- payments.client_id → clients.id
- leads.agent_id → users.id

## RLS
Todas las tablas tienen políticas de seguridad activadas:
- SELECT, INSERT, UPDATE, DELETE filtrados por agency_id = auth.uid()

## Licencia

Todos los derechos reservados.
El uso de este sistema está sujeto a autorización expresa por parte de ARCANA CORP.