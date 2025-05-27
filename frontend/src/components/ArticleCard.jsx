// components/ArticleCard.jsx

// Componente que muestra la información resumida de un artículo en una tarjeta visual.
// Permite ver las categorías, el título, un resumen del contenido y 
// ofrece acciones para ver más detalles o buscar artículos similares.

export default function ArticleCard({ article, onShowMore, onShowSimilar }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
      <p className="text-gray-600 text-sm mb-4 truncate">{article.content}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {article.categories.map((cat, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
          >
            #{cat}
          </span>
        ))}
      </div>
      
      {/* Acciones: ver similares y ver más detalles */}
      <div className="flex justify-between text-sm">
        <button
          onClick={() => onShowSimilar(article.id)}
          className="text-blue-600 hover:underline"
        >
          Ver similares
        </button>
        <button
          onClick={() => onShowMore(article.id)}
          className="text-gray-600 hover:underline"
        >
          Ver más
        </button>
      </div>
    </div>
  );
}
