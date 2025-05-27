// components/CategoryFilter.jsx

function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return (
    <div className="mb-8">
      <label className="block mb-2 font-medium text-gray-700">
        Filtrar por categoría:
      </label>
      <select
        value={selectedCategory}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm"
      >
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
