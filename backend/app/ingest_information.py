# ingestInformation.py
# Este módulo se encarga de cargar artículos de ejemplo (mock) desde un archivo JSON,
# generar sus embeddings y almacenarlos en la base de datos vectorial mediante Qdrant.

import json
from pathlib import Path
from app.embedding import generate_embedding
from app.qdrant_db import insert_article, collection_has_data, clear_collection

# Define la ruta al archivo de datos mock (artículos de ejemplo)
DATA_PATH = Path(__file__).parent / "data" / "mock_data.json"

# Función asíncrona para cargar artículos de ejemplo, generar sus embeddings y almacenarlos en la base de datos
async def load_mock_articles():
    clear_collection()

    if collection_has_data():
        print("Artículos ya insertados en la base de datos.")
        return
    
    print("Insertando artículos mock en Qdrant...")
    
    with open(DATA_PATH, "r") as f:
        articles = json.load(f)

    for article in articles:
        text = f"{article['title']}. {article['content']}"
        embedding = generate_embedding(text)
        insert_article(article, embedding)
