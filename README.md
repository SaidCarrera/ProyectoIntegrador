# Library Management System (LMS)  

**Un sistema moderno para la gestión de bibliotecas, desarrollado con Angular, Node.js y MongoDB.**  
Este proyecto permite la administración eficiente de libros, reservas y compras, proporcionando una experiencia fluida tanto para usuarios como para administradores.  

## Características  
**Gestión de Usuarios** (Registro, autenticación con JWT, roles: Administrador/Usuario).  
**Gestión de Libros** (CRUD, disponibilidad, categorías, stock).  
**Sistema de Reservas** (Reservar libros, estados, cálculo de multas dinámico).  
**Sistema de Compras** (Compra de libros, stock en tiempo real, historial de compras).  
**Dashboard de Administración** (Reportes en tiempo real con estadísticas).  

---

## Tecnologías Utilizadas  

### **Frontend (Angular 19.07)**  
- Angular Material UI  
- RxJS  
- Chart.js (para estadísticas)  

### **Backend (Node.js 23.6.0 + Express.js B6.0.20)**  
- MongoDB + Mongoose  
- JWT para autenticación  
- Swagger para documentación de API  

---

## 🏗️ Principios SOLID y Patrones de Diseño Aplicados  

**SRP (Responsabilidad Única):** Servicios como `AuthService`, `BookService` y `ReservationService` tienen una única responsabilidad.  
**OCP (Abierto/Cerrado):** Implementación del **Patrón Estrategia** para el cálculo de multas dinámico.  
**DIP (Inversión de Dependencias):** `PurchaseService` depende de la abstracción `IPaymentGateway`, no de una implementación concreta.  
**Patrón Repositorio:** Manejo de datos desacoplado (`BookRepository`, `UserRepository`).  
**Patrón Fábrica:** Creación flexible de objetos con `UserFactory` y `PurchaseFactory`.  

---

## Instalación y Configuración  

### ** Clonar el Repositorio**  
```sh
git clone https://github.com/tu-usuario/library-management-system.git
cd library-management-system
cd backend
npm install
cp .env.example .env  # Configurar variables de entorno
npm start  # Iniciar servidor en http://localhost:3000
cd frontend
npm install
npm start  # Iniciar Angular en http://localhost:4200


