// App.jsx
// Componente principal del frontend de Enube-News-App.
// Permite buscar artículos por palabra clave usando una API de búsqueda semántica y muestra los resultados de forma atractiva.

// Importaciones necesarias
import { useState } from "react";
import axios from "axios";

function App() {
  // Estado para manejar la consulta de búsqueda, artículos encontrados, estado de carga y errores
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de la API, configurable por variable de entorno
  const api = import.meta.env.VITE_API_URL;

  // Función para buscar artículos usando la API
  const search = async () => {
    if (!query.trim()) return; // No buscar si la consulta está vacía
    setLoading(true);
    setError(null);
    try {
      // Llama a la API de búsqueda semántica
      const response = await axios.get(`${api}/search?q=${query}`);
      setArticles(response.data);
    } catch (err) {
      setError("Ocurrió un error al buscar. Intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-4 py-10 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Título principal */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          📰 Búsqueda Semántica de Noticias
        </h1>

        {/* Barra de búsqueda y botón */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Buscar artículos por palabra clave..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={search}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>

        {/* Indicador de carga */}
        {loading && (
          <p className="text-center text-gray-500">🔄 Buscando artículos...</p>
        )}
        {/* Mensaje de error */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Mensaje si no hay resultados */}
        {!loading && articles.length === 0 && !error && (
          <p className="text-center text-gray-400 italic">No se encontraron resultados.</p>
        )}

        {/* Lista de artículos encontrados */}
        <div className="flex flex-col gap-6">
          {articles.map((a, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{a.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{a.content}</p>
              <div className="flex flex-wrap gap-2">
                {a.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    #{cat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
