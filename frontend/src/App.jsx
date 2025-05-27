// App.jsx
// Componente principal del frontend de Enube-News-App.
// Permite buscar, filtrar y visualizar artículos, así como ver detalles y artículos similares.
// Utiliza componentes reutilizables y maneja el estado global de la aplicación.

import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ArticleModal from "./components/ArticleModal";
import ArticleCard from "./components/ArticleCard";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  // Estado local para manejar la búsqueda, artículos, categorías y estado de carga/error
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [categories, setCategories] = useState(["Todas"]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de la API, configurable por variable de entorno
  const api = import.meta.env.VITE_API_URL;

  // Obtiene todos los artículos y categorías únicas desde la API
  const fetchAllArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/all`);
      setArticles(response.data);
      setQuery("");
      setSelectedCategory("Todas");

      // Extrae todas las categorías únicas de los artículos
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

  // Carga los artículos al montar el componente
  useEffect(() => {
    fetchAllArticles();
  }, []);

  // Filtra los artículos según la categoría seleccionada
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

  // Realiza una búsqueda semántica de artículos por texto
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

  // Abre el modal con los detalles de un artículo específico
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

  // Obtiene artículos similares a uno dado por su ID
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
        {/* Título principal */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          📰 Búsqueda Semántica de Noticias
        </h1>

        {/* Barra integrada de búsqueda + filtro de categorías */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <SearchBar
              query={query}
              onChange={setQuery}
              onSearch={search}
              onReset={fetchAllArticles}
            />
          </div>
          <div className="w-full md:w-auto">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>

        {/* Indicador de carga y mensajes de error */}
        {loading && <p className="text-center text-gray-500">🔄 Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && filteredArticles.length === 0 && !error && (
          <p className="text-center text-gray-400 italic">
            No se encontraron resultados.
          </p>
        )}

        {/* Lista de artículos filtrados */}
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

      {/* Modal para mostrar detalles de un artículo */}
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}

export default App;
