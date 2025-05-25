# article_schemas.py

# Define los esquemas de datos para los artículos usando Pydantic.
# Estos esquemas se utilizan para validar y documentar la estructura de los datos en la API.

from pydantic import BaseModel
from typing import List

# Esquema que representa un artículo de noticias.
class Article(BaseModel):
    title: str
    content: str
    categories: List[str]
