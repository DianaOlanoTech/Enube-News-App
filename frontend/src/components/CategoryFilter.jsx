// components/CategoryFilter.jsx

// Componente para seleccionar y filtrar artículos por categoría.
// Muestra un menú desplegable con todas las categorías disponibles y notifica el cambio al componente padre.

function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return (
    <div className="relative w-full sm:w-56">
      {/* Icono de filtro */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg 
          className="h-5 w-5 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
      
      {/* Menú desplegable de categorías */}
      <select
        value={selectedCategory}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;