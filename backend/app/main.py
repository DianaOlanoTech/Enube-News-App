# backend/app/main.py

# Este archivo define la aplicación principal de FastAPI para el backend.
# Se encarga de inicializar la base de datos vectorial y cargar artículos de ejemplo al arrancar el servidor.

from fastapi import FastAPI, Query
from app.ingest_information import load_mock_articles
from app.qdrant_db import init_qdrant, search_similar_articles
from app.embedding import generate_embedding
from app.article_schemas import Article
from typing import List

from fastapi.middleware.cors import CORSMiddleware

# Crea la instancia principal de la aplicación FastAPI
app = FastAPI()

# Configura CORS para permitir solicitudes desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Evento que se ejecuta automáticamente al iniciar la aplicación
@app.on_event("startup")
async def startup_event():
    init_qdrant()
    await load_mock_articles()

# Ruta para buscar artículos similares basados en una consulta de texto
@app.get("/search", response_model=List[Article])
async def search_articles(q: str = Query(..., min_length=3)):
    query_vector = generate_embedding(q)
    results = search_similar_articles(query_vector)
    return results

# Ruta principal para verificar que la API funciona correctamente
@app.get("/")
def read_root():
    return {"message": "API funcionando correctamente"}
