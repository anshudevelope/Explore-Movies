const Pagination = ({ page, total, onPageChange }) => {
  const totalPages = Math.ceil(total / 10);
  if (totalPages <= 1) return null;

  const visiblePages = 5;
  const startPage = Math.max(
    1,
    page - Math.floor(visiblePages / 2)
  );
  const endPage = Math.min(
    totalPages,
    startPage + visiblePages - 1
  );

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center gap-2 justify-center mt-8 flex-wrap">

      {/* Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 rounded bg-gray-800 text-white disabled:opacity-40"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded transition ${
            page === p
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-2 rounded bg-gray-800 text-white disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
