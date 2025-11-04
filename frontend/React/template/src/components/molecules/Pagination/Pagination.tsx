/**
 * Pagination Molecule Component
 * Reusable pagination component with Tailwind styling
 */

import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onChange: (page: number) => void;
}

/**
 * Pagination Component
 * Displays page navigation controls
 */
export function Pagination({
  currentPage,
  totalPages,
  isLoading = false,
  onChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      className="pagination flex items-center justify-center gap-2 mt-8"
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        className="pagination__btn pagination__btn--prev"
        aria-label="Previous page"
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="pagination__pages flex gap-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={`page-${index}`}
            onClick={() => typeof page === 'number' && onChange(page)}
            disabled={page === '...' || currentPage === page || isLoading}
            className={`pagination__page ${currentPage === page ? 'pagination__page--active' : ''}`}
            aria-current={currentPage === page ? 'page' : undefined}
            aria-label={typeof page === 'number' ? `Go to page ${page}` : 'More pages'}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        className="pagination__btn pagination__btn--next"
        aria-label="Next page"
      >
        Next →
      </button>

      {/* Page Info */}
      <div className="pagination__info ml-auto text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}

export default Pagination;
