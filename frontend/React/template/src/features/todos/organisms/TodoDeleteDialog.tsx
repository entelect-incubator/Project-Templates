/**
 * TodoDeleteDialog Organism Component
 * Delete confirmation modal for todo items
 *
 * Atomic Design: Organism - Complex interactive modal
 * Composed of: Modal (Molecule) + Button (Atom) x2
 *
 * @example
 * ```tsx
 * <TodoDeleteDialog
 *   isOpen={showConfirm}
 *   target={todoToDelete}
 *   isPending={isDeleting}
 *   onClose={() => setShowConfirm(false)}
 *   onConfirm={handleConfirmDelete}
 * />
 * ```
 */

import { Button } from '@/components/atoms';
import { Modal } from '@/components/molecules';
import type { TodoDto } from '../types';

export interface TodoDeleteDialogProps {
  /** Whether the modal is open */
  isOpen: boolean;

  /** Todo item to delete (null if not set) */
  target: TodoDto | null;

  /** Whether the delete operation is pending */
  isPending: boolean;

  /** Called when the modal should close */
  onClose: () => void;

  /** Called when delete is confirmed */
  onConfirm: () => Promise<void>;
}

/**
 * TodoDeleteDialog - Delete confirmation modal
 *
 * Features:
 * - Shows target todo title
 * - Confirms before deletion
 * - Loading state during operation
 * - Accessible modal with proper focus management
 * - Prevents accidental deletion
 * - Keyboard support (ESC to close)
 */
export function TodoDeleteDialog({
  isOpen,
  target,
  isPending,
  onClose,
  onConfirm,
}: TodoDeleteDialogProps) {
  if (!isOpen || !target) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Todo?"
      size="sm"
      closeOnBackdropClick={false}
    >
      <div className="modal__body">
        <p>Are you sure you want to delete this todo?</p>
        <p className="font-semibold">"{target.title}"</p>
        <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
      </div>

      <div className="modal__footer modal__footer--between">
        <Button variant="secondary" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>

        <Button variant="danger" onClick={onConfirm} disabled={isPending} isLoading={isPending}>
          {isPending ? 'Deleting...' : '🗑 Delete'}
        </Button>
      </div>
    </Modal>
  );
}

export default TodoDeleteDialog;
