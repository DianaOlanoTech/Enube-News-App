# backend/app/main.py

# Este archivo define la aplicación principal de FastAPI para el backend.
# Se encarga de inicializar la base de datos vectorial y cargar artículos de ejemplo al arrancar el servidor.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import router
from app.qdrant_db import init_qdrant,
from app.ingest_information import load_mock_articles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    init_qdrant()
    await load_mock_articles()

# Rutas agrupadas
app.include_router(router)
