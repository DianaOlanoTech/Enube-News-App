# Dockerfile para el backend de la aplicación Enube-News-App

# Utiliza una imagen base oficial de Python 3.10
FROM python:3.10

# Configura variables de entorno para evitar archivos .pyc y mejorar logs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia primero el archivo de dependencias para aprovechar la caché de Docker
COPY requirements.txt .

# Instala las dependencias del proyecto
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código fuente al contenedor (filtrado por .dockerignore)
COPY . .

# Comando por defecto: inicia el servidor FastAPI usando Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
