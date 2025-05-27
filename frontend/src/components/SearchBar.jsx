// components/SearchBar.jsx

// Componente de barra de búsqueda para ingresar palabras clave y buscar artículos.
// Permite al usuario escribir una consulta, buscar o resetear los resultados.

export default function SearchBar({ query, onChange, onSearch, onReset }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
      {/* Campo de texto para la consulta de búsqueda */}
      <input
        type="text"
        placeholder="Buscar artículos por palabra clave..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Botones de acción para buscar y resetear */}
      <div className="flex gap-2">
        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Buscar
        </button>
        <button
          onClick={onReset}
          className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
