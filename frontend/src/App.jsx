import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ArticleModal from "./components/ArticleModal";
import ArticleCard from "./components/ArticleCard";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [categories, setCategories] = useState(["Todas"]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = import.meta.env.VITE_API_URL;

  const fetchAllArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/all`);
      setArticles(response.data);
      setQuery("");
      setSelectedCategory("Todas");

      // Extraer categorías únicas
      const allCategories = new Set();
      response.data.forEach((a) =>
        a.categories.forEach((cat) => allCategories.add(cat))
      );
      setCategories(["Todas", ...Array.from(allCategories)]);
    } catch {
      setError("No se pudieron cargar los artículos.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  useEffect(() => {
    if (selectedCategory === "Todas") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter((a) =>
        a.categories.includes(selectedCategory)
      );
      setFilteredArticles(filtered);
    }
  }, [selectedCategory, articles]);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${api}/search?q=${query}`);
      setArticles(response.data);
      setSelectedCategory("Todas");
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
      setSelectedCategory("Todas");
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

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {loading && <p className="text-center text-gray-500">🔄 Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && filteredArticles.length === 0 && !error && (
          <p className="text-center text-gray-400 italic">
            No se encontraron resultados.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((a, index) => (
            <ArticleCard
              key={index}
              article={a}
              onShowMore={openModal}
              onShowSimilar={getSimilar}
            />
          ))}
        </div>
      </div>

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}

export default App;
