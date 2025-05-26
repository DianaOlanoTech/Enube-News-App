import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ArticleModal from "./components/ArticleModal";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = import.meta.env.VITE_API_URL;

  const fetchAllArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/all`);
      setArticles(response.data);
    } catch {
      setError("No se pudieron cargar los artículos.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}/search?q=${query}`);
      setArticles(response.data);
    } catch {
      setError("Ocurrió un error al buscar. Intenta de nuevo.");
    }
    setLoading(false);
  };

  const openModal = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/article/${id}`);
      setSelectedArticle(response.data);
    } catch {
      setError("No se pudo cargar el artículo.");
    }
    setLoading(false);
  };

  const getSimilar = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}/similar/${id}`);
      setArticles(response.data);
    } catch {
      setError("No se pudieron obtener artículos similares.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-4 py-10 md:px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          📰 Búsqueda Semántica de Noticias
        </h1>

        <SearchBar
          query={query}
          onChange={setQuery}
          onSearch={search}
          onReset={fetchAllArticles}
        />

        {loading && <p className="text-center text-gray-500">🔄 Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && articles.length === 0 && !error && (
          <p className="text-center text-gray-400 italic">No se encontraron resultados.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((a, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{a.title}</h2>
              <p className="text-gray-600 text-sm mb-4 truncate">{a.content}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {a.categories.map((cat, j) => (
                  <span
                    key={j}
                    className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    #{cat}
                  </span>
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <button
                  onClick={() => getSimilar(a.id)}
                  className="text-blue-600 hover:underline"
                >
                  Ver similares
                </button>
                <button
                  onClick={() => openModal(a.id)}
                  className="text-gray-600 hover:underline"
                >
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}

export default App;
