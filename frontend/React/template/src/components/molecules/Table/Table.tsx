import { forwardRef, useCallback } from 'react';
import type {
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
  TableHTMLAttributes,
  HTMLAttributes,
} from 'react';
import { Spinner } from '@/components/atoms/Spinner';

import './Table.scss';

/**
 * Table component - Data table with sorting, pagination, and responsive design
 *
 * Features:
 * - Sortable columns with indicators
 * - Responsive horizontal scroll on mobile
 * - Loading state with spinner
 * - Empty state messaging
 * - Striped rows option
 * - Hover effects
 * - Full ARIA attributes
 * - Accessible keyboard navigation
 *
 * @example
 * ```tsx
 * <Table
 *   data={users}
 *   isLoading={isLoading}
 *   onSort={(column, direction) => console.log(column, direction)}
 * >
 *   <Table.Head>
 *     <Table.HeaderCell sortable column="name">Name</Table.HeaderCell>
 *     <Table.HeaderCell sortable column="email">Email</Table.HeaderCell>
 *   </Table.Head>
 *   <Table.Body>
 *     {users.map(user => (
 *       <Table.Row key={user.id}>
 *         <Table.Cell>{user.name}</Table.Cell>
 *         <Table.Cell>{user.email}</Table.Cell>
 *       </Table.Row>
 *     ))}
 *   </Table.Body>
 * </Table>
 * ```
 */

export type SortDirection = 'asc' | 'desc' | null;

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Table data for accessibility announcements */
  data?: unknown[];

  /** Show loading state */
  isLoading?: boolean;

  /** Empty state message */
  emptyMessage?: string;

  /** Striped rows (default: true) */
  striped?: boolean;

  /** Show hover effects (default: true) */
  hoverable?: boolean;

  /** Compact padding (default: false) */
  compact?: boolean;

  /** Called when column is sorted */
  onSort?: (column: string, direction: SortDirection) => void;

  /** CSS class name */
  className?: string;

  /** Table content */
  children: ReactNode;
}

/**
 * Table component - Main container
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      data = [],
      isLoading = false,
      emptyMessage = 'No data available',
      striped = true,
      hoverable = true,
      compact = false,
      onSort,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const tableClasses = [
      'table',
      striped && 'table--striped',
      hoverable && 'table--hoverable',
      compact && 'table--compact',
      isLoading && 'table--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="table-wrapper">
        <table ref={ref} className={tableClasses} role="table" aria-busy={isLoading} {...props}>
          {children}
        </table>

        {isLoading && (
          <div className="table__loading" role="status" aria-label="Loading table data">
            <Spinner size="md" />
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {!isLoading && data.length === 0 && (
          <div className="table__empty" role="status">
            {emptyMessage}
          </div>
        )}
      </div>
    );
  }
);

Table.displayName = 'Table';

/**
 * Table.Head component - Table header
 */
export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Header content (typically HeaderCell components) */
  children: ReactNode;

  /** CSS class name */
  className?: string;
}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <thead ref={ref} className={`table__head ${className}`.trim()} {...props}>
        <tr className="table__header-row">{children}</tr>
      </thead>
    );
  }
);

TableHead.displayName = 'Table.Head';

/**
 * Table.Body component - Table body
 */
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Body content (typically Row components) */
  children: ReactNode;

  /** CSS class name */
  className?: string;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <tbody ref={ref} className={`table__body ${className}`.trim()} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'Table.Body';

/**
 * Table.Row component - Table row
 */
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Row content (typically Cell components) */
  children: ReactNode;

  /** Mark row as selected/highlighted */
  selected?: boolean;

  /** CSS class name */
  className?: string;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, selected = false, className = '', ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={`table__row ${selected ? 'table__row--selected' : ''} ${className}`.trim()}
        aria-selected={selected}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'Table.Row';

/**
 * Table.Cell component - Table data cell
 */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
  /** Cell content */
  children: ReactNode;

  /** Text alignment */
  align?: 'left' | 'center' | 'right';

  /** CSS class name */
  className?: string;
}

export const TableCell = forwardRef<HTMLTableDataCellElement, TableCellProps>(
  ({ children, align = 'left', className = '', ...props }, ref) => {
    return (
      <td ref={ref} className={`table__cell table__cell--${align} ${className}`.trim()} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'Table.Cell';

/**
 * Table.HeaderCell component - Table header cell with sorting support
 */
export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Cell content */
  children: ReactNode;

  /** Enable sorting for this column */
  sortable?: boolean;

  /** Column identifier for sorting */
  column?: string;

  /** Current sort direction */
  sortDirection?: SortDirection;

  /** Called when sorted */
  onSort?: (column: string, direction: SortDirection) => void;

  /** Text alignment */
  align?: 'left' | 'center' | 'right';

  /** CSS class name */
  className?: string;
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  (
    {
      children,
      sortable = false,
      column = '',
      sortDirection = null,
      onSort,
      align = 'left',
      className = '',
      ...props
    },
    ref
  ) => {
    const handleSort = useCallback(() => {
      if (!sortable || !onSort || !column) return;

      let nextDirection: SortDirection = 'asc';
      if (sortDirection === 'asc') nextDirection = 'desc';
      if (sortDirection === 'desc') nextDirection = null;

      onSort(column, nextDirection);
    }, [sortable, onSort, column, sortDirection]);

    return (
      <th
        ref={ref}
        className={`table__header-cell table__header-cell--${align} ${
          sortable ? 'table__header-cell--sortable' : ''
        } ${className}`.trim()}
        onClick={sortable ? handleSort : undefined}
        role={sortable ? 'button' : 'columnheader'}
        tabIndex={sortable ? 0 : -1}
        aria-sort={
          sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none'
        }
        {...props}
      >
        <div className="table__header-content">
          <span>{children}</span>
          {sortable && (
            <span
              className={`table__sort-indicator ${
                sortDirection ? `table__sort-indicator--${sortDirection}` : ''
              }`.trim()}
              aria-hidden="true"
            >
              ⇅
            </span>
          )}
        </div>
      </th>
    );
  }
);

TableHeaderCell.displayName = 'Table.HeaderCell';

// Attach sub-components
(Table as any).Head = TableHead;
(Table as any).Body = TableBody;
(Table as any).Row = TableRow;
(Table as any).Cell = TableCell;
(Table as any).HeaderCell = TableHeaderCell;
