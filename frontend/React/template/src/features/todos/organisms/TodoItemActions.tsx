/**
 * TodoItemActions Organism Component
 * Handles all action buttons for a todo item (toggle, delete)
 *
 * Atomic Design: Organism - Complex interactive component
 * Composed of: Button (Atom) x2
 *
 * @example
 * ```tsx
 * <TodoItemActions
 *   todo={todoItem}
 *   isUpdating={isLoading}
 *   onToggle={handleToggle}
 *   onDelete={handleDelete}
 * />
 * ```
 */

import { Button } from '@/components/atoms';
import type { TodoDto } from '../types';
import './TodoItemActions.scss';

export interface TodoItemActionsProps {
  /** Todo item data */
  todo: TodoDto;

  /** Whether the item is being updated */
  isUpdating: boolean;

  /** Called when toggle complete button is clicked */
  onToggle: () => Promise<void>;

  /** Called when delete button is clicked */
  onDelete: () => void;
}

/**
 * TodoItemActions - Action buttons for a todo item
 *
 * Features:
 * - Toggle complete/incomplete button with context-aware label
 * - Delete button with loading state
 * - Disabled when updating
 * - Accessible with proper ARIA labels
 * - Responsive button sizing
 */
export function TodoItemActions({ todo, isUpdating, onToggle, onDelete }: TodoItemActionsProps) {
  return (
    <div className="todo-item-actions">
      <Button
        size="sm"
        variant="secondary"
        onClick={onToggle}
        disabled={isUpdating}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed ? '↩ Undo' : '✓ Done'}
      </Button>

      <Button
        size="sm"
        variant="danger"
        onClick={onDelete}
        disabled={isUpdating}
        aria-label={`Delete todo: ${todo.title}`}
      >
        🗑 Delete
      </Button>
    </div>
  );
}

export default TodoItemActions;
