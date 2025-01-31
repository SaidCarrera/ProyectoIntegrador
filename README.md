# Sistema de Gestión de Bibliotecas Web

Este proyecto es un sistema web moderno desarrollado para la gestión eficiente de bibliotecas. El sistema permite a los usuarios y administradores gestionar libros, reservas, compras y usuarios de manera automatizada y segura. Está diseñado para optimizar los procesos de las bibliotecas tradicionales, ofreciendo una solución integral y escalable.

## Características Principales

- **Gestión de Usuarios**: Registro y autenticación de usuarios con roles diferenciados (Administrador/Usuario). Control de acceso seguro mediante JWT (JSON Web Token).
- **Gestión de Libros**: Catálogo digital con información detallada de cada libro, organización por categorías y control de disponibilidad en tiempo real.
- **Sistema de Reservas**: Reservas en línea, seguimiento del estado de las reservas, gestión automática de vencimientos y multas dinámicas por retrasos.
- **Sistema de Compras**: Compra de libros dentro de la plataforma, historial de compras y actualización automática del stock.
- **Panel de Administrador**: Dashboard en tiempo real con reportes de libros en stock, préstamos, reservas activas, usuarios registrados y multas generadas.

## Tecnologías Utilizadas

- **Frontend**: Angular
- **Backend**: Node.js con Express.js
- **Base de Datos**: MongoDB
- **Autenticación**: JWT (JSON Web Token)
- **Patrones de Diseño**: Principios SOLID, Patrón Repositorio, Patrón Fábrica, Patrón Estrategia

## Instalación y Configuración

- Instalar Dependencias:
# Frontend:
bash
Copy
cd frontend
npm install
# Backend:
bash
Copy
cd backend
npm install

# Configurar Variables de Entorno:
Crear un archivo .env en la carpeta backend con las siguientes variables:
MONGODB_URI=tu_cadena_de_conexion_mongodb
JWT_SECRET=tu_clave_secreta_jwt
API_URL=http://localhost:3000


# Acceder al Sistema:
Abre tu navegador y visita http://localhost:4200 para acceder al frontend.
Estructura del Proyecto

Frontend: Contiene la interfaz de usuario desarrollada con Angular.
Backend: Contiene la lógica del servidor desarrollada con Node.js y Express.js.
Base de Datos: MongoDB para almacenar la información de libros, usuarios, reservas y compras.
Pruebas Funcionales

# Se han implementado pruebas funcionales para garantizar el correcto funcionamiento del sistema. Algunas de las pruebas incluyen:

Autenticación de Usuarios: Verificación del proceso de login y registro.
Gestión de Libros: Pruebas de creación, actualización y eliminación de libros.
Cálculo de Multas: Verificación del cálculo de multas por retrasos en la devolución de libros.
Mejoras Futuras

Integración con Bibliotecas Externas: Permitir la integración con otras bibliotecas físicas.
Carga Masiva de Datos: Implementar la carga masiva de libros y usuarios mediante archivos CSV.
Sistema de Notificaciones: Añadir notificaciones automáticas por correo electrónico para recordatorios de vencimientos y multas.
Contribuciones

<img width="777" alt="Captura de pantalla 2025-01-31 a la(s) 12 33 09 a  m" src="https://github.com/user-attachments/assets/14b74448-2800-4c3a-9982-f19aa1526944" />
<img width="782" alt="Captura de pantalla 2025-01-31 a la(s) 12 33 27 a  m" src="https://github.com/user-attachments/assets/a818f94d-216b-4543-aa88-7daee1234f66" />


Desarrollado por: Said Carrera
Universidad: Universidad de las Américas
