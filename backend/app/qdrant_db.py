# qdrant_db.py

# Este módulo gestiona la conexión y operaciones con la base de datos vectorial Qdrant.
# Permite inicializar la colección de artículos y almacenar artículos con sus embeddings para búsquedas semánticas.

import time
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
import uuid

# Inicializa el cliente de Qdrant apuntando al host y puerto configurados en Docker.
client = QdrantClient(host="qdrant", port=6333)

# Nombre de la colección donde se almacenan los artículos
COLLECTION_NAME = "articles" 

# Inicializa la colección en Qdrant, creando la colección si no existe.
def init_qdrant():
    max_retries = 10
    for attempt in range(max_retries):
        try:
            collections = client.get_collections().collections
            # Si la colección no existe, la crea con configuración para vectores de tamaño 384 y distancia coseno
            if COLLECTION_NAME not in [c.name for c in collections]:
                client.recreate_collection(
                    collection_name=COLLECTION_NAME,
                    vectors_config=VectorParams(size=384, distance=Distance.COSINE),
                )
            print(f"Qdrant conectado y colección '{COLLECTION_NAME}' lista.")
            return
        except Exception as e:
            print(f"Esperando a Qdrant... intento {attempt + 1}/{max_retries}")
            time.sleep(3)
    raise RuntimeError("Qdrant no está disponible después de varios intentos.")

# Inserta un artículo y su embedding en la colección de Qdrant.
def insert_article(article: dict, embedding: list):
    point = PointStruct(
        id=str(uuid.uuid4()),  # Genera un identificador único
        vector=embedding,      # Embedding vectorial del artículo
        payload=article        # Datos originales del artículo como metadatos
    )
    client.upsert(collection_name=COLLECTION_NAME, points=[point])


# Busca artículos similares en la colección de Qdrant usando un vector de consulta.
def search_similar_articles(query_vector: list, limit: int = 5, score_threshold: float = 0.75):
    search_result = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=limit,
        with_payload=True,
        with_vectors=False,
        score_threshold=score_threshold
    )
    return [point.payload for point in search_result]
