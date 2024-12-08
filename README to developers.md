# NovaScript - Proyecto de Razonamiento y Memoria de Trabajo  

**NovaScript (NS)** desarrolla soluciones innovadoras para promover el bienestar social. Este repositorio contiene el código y la documentación técnica del proyecto **Clasificación de Números**, un juego web diseñado para estimular las capacidades cognitivas en personas mayores con Alzheimer y proporcionar herramientas de seguimiento a los profesionales de la salud.  

---

## Arquitectura  

El sistema se desarrolla bajo un modelo arquitectónico de **N-capas**, organizado como sigue:  

### 1. Capa de Presentación  
**Tecnologías:** React, React Router, CSS  
**Descripción:**  
- El cliente ejecuta una aplicación React que se comunica con el servidor mediante Axios para realizar peticiones HTTP.  

### 2. Capa de Lógica de Negocios  
**Tecnologías:** Node.js, Express, JWT, Axios  
**Descripción:**  
- Autenticación de terapeutas y gestión de sesiones mediante JWT.  
- Rutas CRUD para manejar datos de pacientes y partidas.  
- Centraliza la lógica del sistema para procesar las solicitudes y respuestas.  

### 3. Capa de Persistencia de Datos  
**Tecnologías:** PostgreSQL  
**Descripción:**  
- Almacena los datos de usuarios, pacientes y registros de partidas.  
- Las operaciones CRUD se gestionan a través de consultas SQL desde el backend.  

---

## Herramientas y Tecnologías  

### Frontend  
- **JavaScript (JS):** Manipulación dinámica e interactividad.  
- **CSS:** Diseño y estilización de la interfaz.  
- **React:** Construcción de interfaces modulares y eficientes.  
- **React Router:** Navegación dinámica en SPA.  

### Backend  
- **Node.js:** Ejecución de código en el servidor.  
- **Express:** Gestión de rutas, peticiones y respuestas.  
- **JWT:** Autenticación y autorización mediante tokens seguros.  
- **Axios:** Comunicación entre frontend y backend vía HTTP.  
- **PostgreSQL:** Gestión estructurada de datos persistentes.  

---

## Principales Funcionalidades  

### Juego de Clasificación  
- Clasificación de números en rangos predefinidos.  
- Registro de aciertos y tiempos por partida.  

### Gestión del Psicoterapeuta  
- Inicio de sesión seguro.  
- Visualización y gestión de pacientes.  
- Análisis de partidas y seguimiento del progreso.  

---

## Usuarios de Prueba por defecto
  
### Psicoterapeuta - Laura Beatriz Gómez Rodríguez:
**Usuario:** lauragomezr  
**Clave:** clave123  
#### Pacientes:  
- **ID:** 1712345679 | **Nombre:** Juan Carlos Ramírez Pérez  
- **ID:** 1712345680 | **Nombre:** Ana María López Fernández  

### Psicoterapeuta - Carlos Alberto Pérez Sánchez:
**Usuario:** carlosperezs  
**Clave:** clave456  
#### Pacientes:  
- **ID:** 1712345681 | **Nombre:** Luis Alberto Hernández Gómez  
- **ID:** 1712345683 | **Nombre:** Miguel Ángel Díaz Márquez  

### Psicoterapeuta - María Elena Martínez Gómez  :
**Usuario:** mariamartinezg  
**Clave** clave789  
#### Pacientes:  
- **ID:** 1712345682 | **Nombre:** Lucía Elena García Rodríguez  

---

## Pasos para ejecución local

Para una ejecución en un entorno local, se recomienda usar [Visual Studio Code](https://code.visualstudio.com/download).  

Luego de clonar el repositorio, es necesario seguir un proceso para crear la base de datos local, instalar las dependencias y ejecutar la app. 

Para crear la BD debes usar PostgreSQL con los siguientes datos

``` JS
  user: "postgres",
  database: "nova_project_db",
  password: "1029"
```

**Nota:** Puedes cambiar la contraseña en ```Codigo\backend\database\db.js```

Y luego añadir las tablas de ```"Codigo\backend\database\database.sql"``` en tu BD recien creada.

Después, para seguir el proceso es necesario abrir dos terminales:

- **La primera** debe estar abierta en la ubicación "Codigo/backend", lo cual se realiza con el comando:  

    ```bash
    cd Codigo/backend
    ```

    Luego, se instalan las dependencias con

    ```bash
    npm i
    ```

    Y por último, ejecutar el servidor backen con el comando:

    ```bash
    node server.js
    ```

- **La segunda** debe estar abierta en la ubicación "Codigo/frontend", lo cual se realiza con el comando:  

    ```bash
    cd Codigo/frontend
    ```

    Luego, se instalan las dependencias con

    ```bash
    npm i
    ```

    Y por último, ejecutar la aplicación con el comando:

    ```bash
    npm start
    ```

Con estos pasos, se abre una nueva ventana en tu navegador que muestra la aplicación funcional.

---

Este proyecto es una herramienta técnica diseñada para contribuir al bienestar social y facilitar el trabajo de los profesionales de la salud.  
¡Contribuye y optimiza el código para hacerlo aún mejor! 🚀  
