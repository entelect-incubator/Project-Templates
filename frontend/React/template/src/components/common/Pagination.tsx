/**
 * Pagination Component
 * Reusable pagination component with UI component composition
 */

import { useCallback, useMemo } from 'react';
import { Button } from '@/components/ui';
import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onChange: (page: number) => void;
}

/**
 * Generates page numbers to display with ellipsis for large page ranges
 * Memoized to prevent unnecessary recalculations
 */
const getPageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

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

/**
 * Pagination Component
 * Displays page navigation controls using UI Button component
 */
export function Pagination({
  currentPage,
  totalPages,
  isLoading = false,
  onChange,
}: PaginationProps) {
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  }, [currentPage, onChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onChange]);

  const handlePageClick = useCallback(
    (page: number | string) => {
      if (typeof page === 'number') {
        onChange(page);
      }
    },
    [onChange]
  );

  // Memoize page numbers calculation
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  return (
    <nav
      className='pagination flex items-center justify-center gap-2 mt-8'
      aria-label='Pagination Navigation'
    >
      {/* Previous Button */}
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        variant='secondary'
        size='md'
        aria-label='Previous page'
      >
        ← Previous
      </Button>

      {/* Page Numbers */}
      <div className='pagination__pages flex gap-1'>
        {pageNumbers.map((page, index) => (
          <Button
            key={typeof page === 'number' ? `page-${page}` : `ellipsis-${index}`}
            onClick={() => handlePageClick(page)}
            disabled={page === '...' || currentPage === page || isLoading}
            variant={currentPage === page ? 'primary' : 'secondary'}
            size='sm'
            aria-current={currentPage === page ? 'page' : undefined}
            aria-label={typeof page === 'number' ? `Go to page ${page}` : 'More pages'}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        variant='secondary'
        size='md'
        aria-label='Next page'
      >
        Next →
      </Button>

      {/* Page Info */}
      <div className='pagination__info ml-auto text-sm text-gray-600'>
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}

export default Pagination;
