/**
 * TodoHeader Organism Component
 * Page header with search, filters, and stats
 *
 * Atomic Design: Organism - Complex layout component
 * Composed of: Card (Atom), SearchForm (Molecule), Badge (Atom)
 *
 * @example
 * ```tsx
 * <TodoHeader
 *   searchQuery={query}
 *   onSearch={setQuery}
 *   isLoading={loading}
 *   stats={{ total: 10, completed: 3 }}
 * />
 * ```
 */

import { Badge, Card } from '@/components/atoms';
import { SearchForm } from '@/components/molecules';
import './TodoHeader.scss';

export interface TodoHeaderProps {
  /** Current search query */
  searchQuery: string;

  /** Called when search query changes */
  onSearch: (query: string) => void;

  /** Whether data is loading */
  isLoading: boolean;

  /** Statistics object */
  stats?: {
    total: number;
    completed: number;
  };
}

/**
 * TodoHeader - Page header with search and stats
 *
 * Features:
 * - Debounced search input
 * - Quick stats badges
 * - Responsive design
 * - Loading state handling
 * - Clear visual hierarchy
 */
export function TodoHeader({ searchQuery, onSearch, isLoading, stats }: TodoHeaderProps) {
  return (
    <div className="todo-header">
      {/* Title and subtitle */}
      <div className="todo-header__title-section">
        <h1 className="todo-header__title">📋 My Todos</h1>
        <p className="todo-header__subtitle">Manage your tasks efficiently</p>
      </div>

      {/* Search bar */}
      <Card className="todo-header__search-card">
        <div className="card__body">
          <SearchForm
            value={searchQuery}
            onSearch={onSearch}
            isLoading={isLoading}
            placeholder="Search todos by title or description..."
            debounceDelay={300}
            showClearButton
            showSubmitButton
          />
        </div>
      </Card>

      {/* Stats */}
      {stats && (
        <div className="todo-header__stats">
          <div className="todo-header__stat-item">
            <Badge variant="primary">
              <strong>{stats.total}</strong> Total
            </Badge>
          </div>
          <div className="todo-header__stat-item">
            <Badge variant="success">
              <strong>{stats.completed}</strong> Done
            </Badge>
          </div>
          <div className="todo-header__stat-item">
            <Badge variant="default">
              <strong>{stats.total - stats.completed}</strong> Pending
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoHeader;
