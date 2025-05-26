// components/ArticleModal.jsx

export default function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h2>
        <p className="text-gray-700 mb-4">{article.content}</p>
        <div className="flex flex-wrap gap-2">
          {article.categories.map((cat, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
            >
              #{cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
