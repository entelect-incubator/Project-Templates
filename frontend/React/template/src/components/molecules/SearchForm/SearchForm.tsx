import { forwardRef, useState, useCallback } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner';

import './SearchForm.scss';

/**
 * SearchForm component - Input with debounced search and submit button
 *
 * Features:
 * - Debounced search trigger (configurable delay)
 * - Loading state during search
 * - Optional clear button
 * - Submit button with loading indicator
 * - Full keyboard support (Enter to search)
 * - ARIA attributes for accessibility
 * - Error/success state display
 *
 * @example
 * ```tsx
 * <SearchForm
 *   placeholder="Search users..."
 *   onSearch={(query) => {
 *     console.log('Searching for:', query);
 *   }}
 *   debounceDelay={300}
 * />
 * ```
 */

export interface SearchFormProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit' | 'type'> {
  /** Called when search query changes (after debounce) */
  onSearch?: (query: string) => void | Promise<void>;

  /** Called when form is submitted */
  onSubmit?: (query: string) => void | Promise<void>;

  /** Debounce delay in milliseconds */
  debounceDelay?: number;

  /** Show clear button */
  showClearButton?: boolean;

  /** Show submit button */
  showSubmitButton?: boolean;

  /** Button label */
  submitLabel?: string;

  /** Clear button label */
  clearLabel?: string;

  /** Loading state */
  isLoading?: boolean;

  /** Error message to display */
  error?: string;

  /** Success message to display */
  success?: string;

  /** CSS class name */
  className?: string;
}

/**
 * SearchForm component
 */
export const SearchForm = forwardRef<HTMLInputElement, SearchFormProps>(
  (
    {
      placeholder = 'Search...',
      onSearch,
      onSubmit,
      debounceDelay = 300,
      showClearButton = true,
      showSubmitButton = true,
      submitLabel = 'Search',
      clearLabel = 'Clear',
      isLoading = false,
      error,
      success,
      className = '',
      required = false,
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Manual debounce implementation for search on input change
    const [pendingSearch, setPendingSearch] = useState<NodeJS.Timeout | null>(null);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        // Clear previous timeout
        if (pendingSearch) {
          clearTimeout(pendingSearch);
        }

        // Set new timeout for debounced search
        const timeout = setTimeout(async () => {
          if (onSearch) {
            try {
              await onSearch(newQuery);
            } catch (err) {
              console.error('Search error:', err);
            }
          }
        }, debounceDelay);

        setPendingSearch(timeout);
      },
      [onSearch, debounceDelay, pendingSearch]
    );

    const handleClear = useCallback(() => {
      setQuery('');

      // Clear pending search
      if (pendingSearch) {
        clearTimeout(pendingSearch);
        setPendingSearch(null);
      }

      // Trigger search with empty query
      if (onSearch) {
        onSearch('');
      }
    }, [onSearch, pendingSearch]);

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear pending search
        if (pendingSearch) {
          clearTimeout(pendingSearch);
          setPendingSearch(null);
        }

        if (onSubmit) {
          setIsSubmitting(true);
          try {
            await onSubmit(query);
          } catch (err) {
            console.error('Submit error:', err);
          } finally {
            setIsSubmitting(false);
          }
        }
      },
      [query, onSubmit, pendingSearch]
    );

    const isLoaded = isLoading || isSubmitting;

    return (
      <div className={`search-form ${isLoaded ? 'search-form--loading' : ''} ${className}`.trim()}>
        <form onSubmit={handleSubmit} className="search-form__form" noValidate>
          <div className="search-form__input-group">
            <Input
              ref={ref}
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={handleChange}
              disabled={isLoaded}
              required={required}
              aria-label="Search query"
              aria-describedby={error ? 'search-error' : undefined}
              aria-busy={isLoaded}
              {...props}
            />

            {isLoaded && (
              <div className="search-form__loader">
                <Spinner size="sm" />
              </div>
            )}
          </div>

          <div className="search-form__actions">
            {showClearButton && query && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClear}
                disabled={isLoaded}
                type="button"
                aria-label={clearLabel}
              >
                {clearLabel}
              </Button>
            )}

            {showSubmitButton && (
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={isLoaded || !query}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="xs" />
                    <span>Searching...</span>
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
            )}
          </div>
        </form>

        {error && (
          <div id="search-error" className="search-form__error" role="alert" aria-live="polite">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586 3.313 7.899a1 1 0 00-1.414 1.414l6.687 6.687-6.687 6.687a1 1 0 101.414 1.414L10 17.414l6.687 6.687a1 1 0 001.414-1.414l-6.687-6.687 6.687-6.687z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && !error && (
          <div className="search-form__success" role="status" aria-live="polite">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}
      </div>
    );
  }
);

SearchForm.displayName = 'SearchForm';
