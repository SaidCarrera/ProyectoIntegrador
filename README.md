# Sistema de Gestión de Bibliotecas Web

![Banner del Proyecto](https://via.placeholder.com/1200x400) <!-- Puedes agregar una imagen de banner aquí -->

Este proyecto es un sistema web moderno desarrollado para la gestión eficiente de bibliotecas. El sistema permite a los usuarios y administradores gestionar libros, reservas, compras y usuarios de manera automatizada y segura. Está diseñado para optimizar los procesos de las bibliotecas tradicionales, ofreciendo una solución integral y escalable.

## Tabla de Contenidos

- [Problema a Solucionar](#problema-a-solucionar)
- [Alternativas de Solución](#alternativas-de-solución)
- [Solución Seleccionada](#solución-seleccionada)
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Funcionalidades del Proyecto](#funcionalidades-del-proyecto)
- [Restricciones del Proyecto](#restricciones-del-proyecto)
- [Alcance del Proyecto](#alcance-del-proyecto)
- [Limitaciones del Proyecto](#limitaciones-del-proyecto)
- [Diagrama de Clases](#diagrama-de-clases)
- [Problemas en la Implementación](#problemas-en-la-implementación)
- [Pruebas Funcionales](#pruebas-funcionales)
- [Mejoras Futuras](#mejoras-futuras)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Problema a Solucionar

Las bibliotecas tradicionales enfrentan múltiples desafíos en la gestión de su catálogo de libros, reservas y usuarios. Con la digitalización de procesos, muchas bibliotecas aún dependen de sistemas manuales o software desactualizados que limitan la eficiencia operativa.

### Problemas Identificados

1. **Gestión Ineficiente del Catálogo de Libros**
   - Falta de un sistema centralizado para organizar y actualizar el inventario de libros.
   - Dificultad para rastrear la disponibilidad de libros en tiempo real.
   - Imposibilidad de categorizar y filtrar libros de manera eficiente.

2. **Reservas y Préstamos con Procesos Manuales**
   - Reservas poco automatizadas, generando retrasos y errores administrativos.
   - Falta de un mecanismo para rastrear vencimientos y notificar a los usuarios.
   - No existe un cálculo automático de multas por retrasos.

3. **Ausencia de un Sistema de Compras Integrado**
   - Las bibliotecas no pueden gestionar la venta de libros de manera estructurada.
   - No hay seguimiento del historial de compras de los usuarios.
   - Las actualizaciones de stock después de una compra se realizan manualmente.

4. **Falta de una Plataforma de Gestión para Administradores**
   - No existen reportes en tiempo real sobre libros prestados, reservas activas y multas pendientes.
   - Falta de herramientas para gestionar usuarios y libros de manera eficiente.
   - Dificultad para monitorear el rendimiento de la biblioteca con estadísticas claras.

5. **Deficiencias en Seguridad y Control de Acceso**
   - Falta de autenticación segura y roles diferenciados entre administradores y usuarios.
   - Posibles riesgos de manipulación de datos por la ausencia de restricciones adecuadas.

---

## Alternativas de Solución

### Alternativa 1: Uso de Software Genérico de Gestión de Bibliotecas
- **Descripción**: Implementar un software comercial ya existente en el mercado, como Koha, OpenBiblio o PMB.
- **Ventajas**:
  - Implementación rápida sin necesidad de desarrollo desde cero.
  - Algunos sistemas son de código abierto, reduciendo costos.
  - Funcionalidades predefinidas para bibliotecas estándar.
- **Desventajas**:
  - Poca flexibilidad para personalización según necesidades específicas.
  - Interfaz y experiencia de usuario limitadas.
  - Dificultad para integrar nuevas funcionalidades como venta de libros y dashboard avanzado.

### Alternativa 2: Uso de Hojas de Cálculo o Software de Bases de Datos
- **Descripción**: Utilizar herramientas como Google Sheets, Microsoft Access o MySQL para gestionar registros de libros, reservas y usuarios manualmente.
- **Ventajas**:
  - Costo inicial bajo.
  - Fácil implementación y configuración.
- **Desventajas**:
  - No es escalable para bibliotecas grandes.
  - No permite automatización eficiente de procesos como reservas o cálculo de multas.
  - Alto riesgo de errores y manipulación manual de datos.

### Alternativa 3: Desarrollo de un Sistema Web Moderno a Medida
- **Descripción**: Crear un sistema web con una arquitectura moderna utilizando Angular para el frontend y Node.js con Express.js y MongoDB para el backend.
- **Ventajas**:
  - Flexibilidad y personalización: Se pueden añadir funcionalidades específicas como venta de libros, estadísticas avanzadas y gestión dinámica de multas.
  - Experiencia de usuario optimizada: Interfaz intuitiva y moderna.
  - Seguridad robusta: Uso de JWT para autenticación y control de acceso basado en roles.
  - Escalabilidad: Permite expandir funcionalidades en el futuro sin afectar el rendimiento.
- **Desventajas**:
  - Mayor tiempo de desarrollo comparado con soluciones prefabricadas.
  - Requiere mantenimiento y actualizaciones.

---

## Solución Seleccionada

La **Alternativa 3: Desarrollo de un Sistema Web Moderno a Medida** fue seleccionada debido a su alta personalización, automatización, seguridad y escalabilidad. A continuación, se presenta un análisis de criterios ponderados:

| Criterio                | Alternativa 1: Software Genérico | Alternativa 2: Hojas de Cálculo | Alternativa 3: Desarrollo Web |
|-------------------------|----------------------------------|---------------------------------|-------------------------------|
| Personalización         | Baja (5/10)                     | Muy baja (3/10)                 | Alta (10/10)                  |
| Automatización          | Media (6/10)                    | Muy baja (2/10)                 | Alta (10/10)                  |
| Seguridad               | Media (7/10)                    | Muy baja (2/10)                 | Alta (10/10)                  |
| Escalabilidad           | Media (6/10)                    | Baja (4/10)                     | Alta (10/10)                  |
| Costo                   | Medio (6/10)                    | Bajo (8/10)                     | Medio (7/10)                  |
| Facilidad de Implementación | Alta (9/10)                 | Alta (9/10)                     | Media (6/10)                  |
| Soporte a largo plazo   | Medio (6/10)                    | Bajo (4/10)                     | Alto (10/10)                  |
| Experiencia de usuario  | Media (6/10)                    | Baja (3/10)                     | Alta (10/10)                  |

**Resultado Total (Promedio de puntuación sobre 10):**
- Alternativa 1 (Software Genérico): 6.4/10
- Alternativa 2 (Hojas de Cálculo): 4.5/10
- **Alternativa 3 (Desarrollo Web): 9.1/10**

---

## Descripción del Proyecto

El proyecto consiste en el desarrollo de un sistema web moderno e integrado para la gestión de bibliotecas. Este sistema optimiza el control de libros, reservas, usuarios y compras, automatizando procesos clave y proporcionando un dashboard de administración en tiempo real.

---

## Funcionalidades del Proyecto

### Gestión de Usuarios
1. Registro y autenticación de usuarios.
2. Implementación de roles (Administrador/Usuario).
3. Control de acceso seguro mediante JWT (JSON Web Token).
4. Administración de perfiles y credenciales.

### Gestión de Libros
1. Catálogo digital con información detallada de cada libro.
2. Organización de libros por categorías.
3. Control de disponibilidad y stock en tiempo real.
4. Funcionalidad para agregar, editar y eliminar libros.

### Sistema de Reservas
1. Posibilidad de que los usuarios reserven libros en línea.
2. Seguimiento del estado de las reservas.
3. Gestión automática de fechas de vencimiento y recordatorios.
4. Multas dinámicas por retrasos en la devolución de libros.

### Sistema de Compras
1. Opción para comprar libros dentro de la plataforma.
2. Historial de compras asociado a cada usuario.
3. Actualización automática del stock tras cada compra.

### Panel de Administrador
1. Visualización de reportes en tiempo real sobre:
   - Libros en stock y prestados.
   - Reservas activas y vencidas.
   - Usuarios registrados y actividad.
   - Multas generadas por retrasos.
2. Gestión completa de usuarios y libros.
3. Monitoreo del rendimiento de la biblioteca.

---

## Restricciones del Proyecto

### Tecnológicas
- Dependencia de Internet: Se requiere conexión estable para acceder al sistema.
- Base de datos NoSQL (MongoDB): Aunque es flexible, puede no ser ideal para bibliotecas extremadamente grandes con consultas SQL complejas.
- Integración con pasarelas de pago: La funcionalidad de compras dependerá de APIs externas para procesar pagos.

### Funcionales
- Limitación en la carga masiva de datos: En la primera versión, la carga de libros y usuarios será manual o mediante archivos CSV.
- Sistema monousuario para reservas: No permite que varios usuarios reserven el mismo libro simultáneamente.
- No incluye integración con bibliotecas físicas externas: Solo administra el stock y préstamos dentro del sistema.

### Operacionales
- Requiere capacitación del personal: Los administradores deben aprender a gestionar el sistema correctamente.
- Mantenimiento periódico: Se necesitarán actualizaciones y soporte técnico para corregir errores y mejorar la plataforma.

---

## Alcance del Proyecto

El Sistema de Gestión de Bibliotecas Web facilitará la administración de libros, usuarios, reservas y compras mediante una plataforma moderna y automatizada. Permitirá a los administradores gestionar el catálogo, controlar la disponibilidad y supervisar préstamos, mientras que los usuarios podrán registrarse, reservar y comprar libros. Se integrará un dashboard con estadísticas en tiempo real, notificaciones sobre vencimientos y multas, y un sistema seguro de autenticación con JWT. El sistema será desarrollado con Angular, Node.js, Express.js y MongoDB, asegurando escalabilidad y flexibilidad.

---

## Limitaciones del Proyecto

El sistema requerirá conexión a Internet y no admitirá integración con bibliotecas externas en su primera versión. Solo permitirá una reserva por libro a la vez y la gestión de préstamos será manual, sin escaneo de códigos de barra. Las compras dependerán de pasarelas de pago externas y la carga de libros y usuarios será manual o mediante archivos CSV. Se requerirá capacitación para los administradores y mantenimiento periódico para garantizar seguridad y estabilidad.

---

## Diagrama de Clases

```plaintext
Usuario
- id: String
- nombre: String
- email: String
- contraseña: String
- rol: String
+ registrar(): void
+ autenticar(): boolean

Administrador
+ gestionarLibros(): void
+ gestionarUsuarios(): void
+ visualizarDashboard(): void

UsuarioRegistrado
+ reservarLibro(): void
+ comprarLibro(): void
+ verHistorial(): void

Reserva
- id: String
- usuario: Usuario
- libro: Libro
- fechaInicio: Date
- fechaVencimiento: Date
- estado: String
+ calcularMulta(): float

Compra
- id: String
- usuario: Usuario
- libro: Libro
- fechaCompra: Date
- precioTotal: float

Dashboard
+ mostrarEstadisticas(): void
+ generarReportes(): void

Libro
- id: String
- título: String
- autor: String
- categoría: String
- stock: int
- estado: String
+ reservar(): boolean
+ comprar(): boolean

<img width="783" alt="Captura de pantalla 2025-01-31 a la(s) 12 45 31 a  m" src="https://github.com/user-attachments/assets/c2c81266-fbd1-4d33-97b7-a54f4c02f3a9" />

<img width="774" alt="Captura de pantalla 2025-01-31 a la(s) 12 45 11 a  m" src="https://github.com/user-attachments/assets/e8b4cee1-3e58-49d8-88ad-53e070d69177" />
