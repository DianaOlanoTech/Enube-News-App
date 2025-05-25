# ingestInformation.py
# Este módulo se encarga de cargar artículos de ejemplo (mock) desde un archivo JSON,
# generar sus embeddings y almacenarlos en la base de datos vectorial mediante Qdrant.

import json
from pathlib import Path
from app.embedding import generate_embedding  # Importa la función para generar embeddings de texto
from app.qdrant_db import insert_article     # Importa la función para insertar artículos en la base de datos

# Define la ruta al archivo de datos mock (artículos de ejemplo)
DATA_PATH = Path(__file__).parent / "data" / "mock_data.json"

# Función asíncrona para cargar artículos de ejemplo, generar sus embeddings y almacenarlos en la base de datos
async def load_mock_articles():
    with open(DATA_PATH, "r") as f:
        articles = json.load(f)
    # Para cada artículo, genera su embedding y lo inserta en la base de datos
    for article in articles:
        embedding = generate_embedding(article["content"])
        insert_article(article, embedding)
        