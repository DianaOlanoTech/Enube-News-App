# Utiliza la librería Sentence Transformers para convertir textos en vectores numéricos (embeddings), 
# que pueden ser usados en tareas de NLP como búsqueda semántica o clustering.

from sentence_transformers import SentenceTransformer

# Carga un modelo pequeño pero potente de Sentence Transformers para generar embeddings de texto.
# Este modelo es multilingüe y está optimizado para tareas de paraphrase y similitud semántica.
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

# Función para generar el embedding de un texto.
def generate_embedding(text: str):
    """
    Recibe un texto (string) y retorna su representación vectorial (embedding).
    El embedding es una lista de 384 números flotantes que representan el significado semántico del texto.
    """
    return model.encode(text).tolist()
