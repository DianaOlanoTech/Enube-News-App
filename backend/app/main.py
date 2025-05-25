# backend/app/main.py

# Este archivo define la aplicación principal de FastAPI para el backend.
# Se encarga de inicializar la base de datos vectorial y cargar artículos de ejemplo al arrancar el servidor.

from fastapi import FastAPI
from app.ingestInformation import load_mock_articles
from app.qdrant_db import init_qdrant

# Crea la instancia principal de la aplicación FastAPI
app = FastAPI()  

# Evento que se ejecuta automáticamente al iniciar la aplicación
@app.on_event("startup")
async def startup_event():
    # Inicializa la base de datos vectorial Qdrant
    init_qdrant()
    # Carga los artículos de ejemplo y los inserta en la base de datos con sus embeddings
    await load_mock_articles()

# Ruta principal para verificar que la API funciona correctamente
@app.get("/")
def read_root():
    return {"message": "API funcionando correctamente"}
