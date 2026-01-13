const Pagination = ({ page, total, onPageChange }) => {
  const totalPages = Math.ceil(total / 10);

  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center mt-6">
      {[...Array(totalPages).keys()].slice(0, 5).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded ${
            page === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black" 
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
