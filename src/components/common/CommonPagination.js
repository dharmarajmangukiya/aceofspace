"use client";

const CommonPagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange = () => {},
  pageSize = 10,
}) => {
  if (!totalPages || totalPages < 1) return null;

  const maxPagesToShow = 5;

  // Determine start and end of visible page range
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Calculate first and last items shown (for display info)
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  let lastItem = Math.min(firstItem + pageSize - 1, totalItems);

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
          <span
            className="page-link pointer"
            tabIndex={0}
            onClick={() => handlePageClick(currentPage - 1)}
            aria-disabled={currentPage === 1}
            aria-label="Previous"
            role="button"
          >
            <span className="fas fa-angle-left" />
          </span>
        </li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item${page === currentPage ? " active" : ""}`}
          >
            <span
              className="page-link pointer"
              tabIndex={0}
              onClick={() => handlePageClick(page)}
              role="button"
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </span>
          </li>
        ))}
        <li
          className={`page-item${
            currentPage === totalPages ? " disabled" : ""
          }`}
        >
          <span
            className="page-link pointer"
            tabIndex={0}
            onClick={() => handlePageClick(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            aria-label="Next"
            role="button"
          >
            <span className="fas fa-angle-right" />
          </span>
        </li>
      </ul>
      <p className="mt10 pagination_page_count text-center">
        {firstItem}-{lastItem} of {totalItems} property
        {totalItems === 1 ? "" : "ies"} available
      </p>
    </div>
  );
};

export default CommonPagination;
