# backend/app/routes.py
# Este módulo define las rutas de la API para manejar artículos y realizar búsquedas semánticas usando FastAPI y Qdrant.

from fastapi import APIRouter, Query, HTTPException
from typing import List
from app.embedding import generate_embedding
from app.qdrant_db import search_similar_articles, client, COLLECTION_NAME
from app.article_schemas import Article

router = APIRouter()

# Ruta raíz de la API para verificar funcionamiento
@router.get("/")
def read_root():
    return {"message": "API funcionando correctamente"}

# Ruta para obtener todos los artículos de la colección
@router.get("/all", response_model=List[Article])
def get_all_articles():
    result = client.scroll(
        collection_name=COLLECTION_NAME,
        with_payload=True,
        with_vectors=False,
        limit=100
    )
    return [point.payload for point in result[0]]

# Ruta para buscar artículos similares a partir de una consulta de texto
@router.get("/search", response_model=List[Article])
def search_articles(q: str = Query(..., min_length=3)):
    query_vector = generate_embedding(q)
    return search_similar_articles(query_vector)

# Ruta para obtener un artículo específico por su ID
@router.get("/article/{article_id}")
def get_article_by_id(article_id: str):
    result = client.retrieve(
        collection_name=COLLECTION_NAME,
        ids=[article_id],
        with_payload=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    return result[0].payload

# Ruta para obtener artículos similares a un artículo específico por su ID
@router.get("/similar/{article_id}")
def get_similar_articles_by_id(article_id: str, limit: int = 5, score_threshold: float = 0.4):
    vectors = client.retrieve(
        collection_name=COLLECTION_NAME,
        ids=[article_id],
        with_vectors=True,
        with_payload=False
    )
    if not vectors:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")

    # Usa el vector del artículo como consulta para buscar similares
    query_vector = vectors[0].vector
    results = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=limit + 1,  # Excluir el propio artículo
        with_payload=True,
        with_vectors=False,
        score_threshold=score_threshold
    )

    # Filtra el propio artículo de los resultados y devuelve solo los similares
    similar = [r.payload for r in results if r.id != article_id]
    return similar
