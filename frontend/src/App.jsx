import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/search?q=${query}`);
      setArticles(response.data);
    } catch (err) {
      console.error("Error al buscar:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">📰 Búsqueda Semántica de Noticias</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-4 py-2 w-full rounded"
        />
        <button
          onClick={search}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {loading && <p>Cargando...</p>}

      <div className="space-y-4">
        {articles.map((a, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{a.title}</h2>
            <p className="text-gray-700 mt-2">{a.content}</p>
            <p className="text-sm text-gray-500 mt-2">Categorías: {a.categories.join(", ")}</p>
          </div>
        ))}
        {!loading && articles.length === 0 && (
          <p className="text-gray-500">No se encontraron artículos.</p>
        )}
      </div>
    </div>
  );
}

export default App;
