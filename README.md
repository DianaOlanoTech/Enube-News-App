# 📰 Enube News App

Aplicación de búsqueda semántica de noticias con arquitectura fullstack (FastAPI + Qdrant + React + Tailwind).

## 🏗️ Arquitectura General

- **Frontend:** Aplicación React moderna, responsiva y estilizada con Tailwind CSS. Permite buscar, filtrar y explorar artículos, ver detalles y encontrar noticias similares.
- **Backend:** API REST construida con FastAPI. Gestiona la generación de embeddings, almacenamiento y búsqueda semántica de artículos usando Qdrant como base de datos vectorial.
- **Base de datos vectorial:** Qdrant almacena los artículos y sus embeddings para búsquedas semánticas eficientes.
- **Comunicación:** El frontend consume la API del backend para todas las operaciones.
- **Orquestación:** Docker y docker-compose para desarrollo y despliegue local sencillo.

## 🛠️ Tecnologías y Frameworks Utilizados

- **Backend:** Python, FastAPI, Sentence Transformers, Qdrant
- **Frontend:** React, Vite, Tailwind CSS
- **Base de datos vectorial:** Qdrant
- **Contenedores:** Docker, Docker Compose

## 🔍 Endpoints disponibles (FastAPI)

| Método | Ruta                | Descripción                                 |
|--------|---------------------|---------------------------------------------|
| GET    | /                   | Verifica si el backend está activo          |
| GET    | /all                | Devuelve todos los artículos en la colección|
| GET    | /search?q=texto     | Búsqueda semántica por texto                |
| GET    | /article/{id}       | Devuelve el detalle de un artículo por su ID|
| GET    | /similar/{id}       | Busca artículos similares a uno dado por su ID |

## 🧠 Consideraciones técnicas

- Los artículos mock se cargan desde un archivo JSON al iniciar el backend.
- Se utilizan embeddings generados por el modelo multilingüe `paraphrase-multilingual-MiniLM-L12-v2`.
- Qdrant se usa para almacenar vectores y realizar búsquedas por similitud.
- En el frontend se implementó una interfaz intuitiva que permite:
  - Buscar por texto
  - Ver artículos similares
  - Abrir detalle de artículos en un modal
  - Filtrar por categoría
  - Resetear la búsqueda para ver todos los artículos nuevamente

## 🚀 Instrucciones de Instalación y Ejecución

### 1️⃣ Clonar el repositorio

```bash
# Clona el repositorio
git clone <https://github.com/tu-usuario/enube-news-app.git>
cd Enube-News-App
```

### 2️⃣ Configuración de variables de entorno

- El frontend ya incluye un archivo `.env` con la variable `VITE_API_URL` definida (por defecto apunta a `http://localhost:8000`).
- Si necesitas personalizar la URL de la API, puedes editar el archivo `.env` en `frontend/` o crear uno nuevo según el entorno.

### 3️⃣ Construcción y ejecución con Docker Compose

```bash
# Desde la raíz del proyecto
docker-compose up --build
```
Esto levantará:
- El backend en `localhost:8000`
- Qdrant en `localhost:6333`
- El frontend en `localhost:3000`

### 4️⃣ Inicialización y carga de datos
- Al iniciar el backend, se inicializa la base de datos Qdrant y se cargan automáticamente los artículos de ejemplo desde `backend/app/data/mock_data.json`.
- No se requiere intervención manual para la carga inicial de datos.

### 5️⃣ Acceso a la aplicación
- Abre tu navegador en [http://localhost:3000](http://localhost:3000) para acceder al frontend.
- La API del backend está disponible en [http://localhost:8000](http://localhost:8000)

## 📁 Estructura de Carpetas

```
Enube-News-App/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes.py
│   │   ├── embedding.py
│   │   ├── qdrant_db.py
│   │   ├── ingest_information.py
│   │   ├── article_schemas.py
│   │   └── data/
│   │       └── mock_data.json
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── components/
│   ├── index.html
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml
└── README.md
```

## 📝 Notas adicionales
- Puedes modificar los artículos de ejemplo en `backend/app/data/mock_data.json` antes de levantar el sistema.
- El backend y frontend están completamente desacoplados y pueden evolucionar de forma independiente.
- Para desarrollo, puedes levantar solo el frontend o backend usando sus respectivos Dockerfiles o scripts locales.

## 👩‍💻 Créditos

- Este proyecto fue desarrollado como parte de una prueba técnica para Enube, demostrando habilidades en desarrollo fullstack, manipulación de embeddings y diseño de interfaces funcionales.

---
