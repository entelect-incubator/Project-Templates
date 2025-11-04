/**
 * Refactored Todo Page Component
 * Showcases all atomic components and molecules from the component library
 *
 * Components Used:
 * - Atoms: Button, Input, Badge, Card, Alert, Checkbox, Spinner
 * - Molecules: Form, FormField, SearchForm, Modal, Pagination
 */

import { useState, Suspense, useMemo } from 'react';
import { useTodos, useCreateTodo, useDeleteTodo, useUpdateTodo } from '../hooks/useTodos';
import { useToast } from '@/components/common/Toast';
import { Button, Input, Badge, Card, Alert, Checkbox, Spinner } from '@/components/atoms';
import { Form, FormField, Pagination, SearchForm, Modal } from '@/components/molecules';
import type { CreateTodoCommand, TodoDto } from '../types';
import './TodoPage.scss';

/**
 * TodoListItem Component - Using Card & Badge atoms
 */
function TodoListItem({
  todo,
  onToggle,
  onDelete,
  isUpdating,
}: {
  todo: TodoDto;
  onToggle: () => Promise<void>;
  onDelete: () => void;
  isUpdating: boolean;
}) {
  return (
    <Card className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      <div className="card__body">
        <div className="todo-item-content">
          <div className="todo-item-header">
            <div className="todo-item-title-group">
              <Checkbox
                checked={todo.completed}
                onChange={onToggle}
                disabled={isUpdating}
                aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
              />
              <div>
                <h4
                  className="todo-item__title"
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                  {todo.title}
                </h4>
                {todo.description && <p className="todo-item__description">{todo.description}</p>}
              </div>
            </div>
            <div className="todo-item-meta">
              <Badge variant={todo.completed ? 'success' : 'default'} size="sm">
                {todo.completed ? '✓ Done' : 'Pending'}
              </Badge>
              <small className="todo-item__date">
                {new Date(todo.createdAt).toLocaleDateString()}
              </small>
            </div>
          </div>
          <div className="todo-item-actions">
            <Button size="sm" variant="secondary" onClick={onToggle} disabled={isUpdating}>
              {todo.completed ? '↩ Undo' : '✓ Done'}
            </Button>
            <Button size="sm" variant="danger" onClick={onDelete} disabled={isUpdating}>
              🗑 Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * TodoListContent Component
 */
function TodoListContent({
  todos,
  isLoading,
  onToggle,
  onDelete,
  isUpdating,
}: {
  todos: TodoDto[];
  isLoading: boolean;
  onToggle: (todo: TodoDto) => Promise<void>;
  onDelete: (todo: TodoDto) => void;
  isUpdating: boolean;
}) {
  if (isLoading) {
    return (
      <div className="loading-state" role="status" aria-live="polite">
        <div className="loading-state__icon">
          <Spinner size="lg" />
        </div>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <Card>
        <div className="card__body">
          <div className="empty-state">
            <div className="empty-state__icon">📝</div>
            <h3>No todos yet</h3>
            <p>Create your first todo to get started!</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="todos-list">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo)}
          onDelete={() => onDelete(todo)}
          isUpdating={isUpdating}
        />
      ))}
    </div>
  );
}

/**
 * Main TodoPage Component
 */
function TodoPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<TodoDto | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const pageSize = 10;

  // Queries and mutations
  const { data, isLoading, error } = useTodos(page, pageSize);
  const createMutation = useCreateTodo();
  const deleteMutation = useDeleteTodo();
  const updateMutation = useUpdateTodo();
  const toast = useToast();

  // Calculate total pages
  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.total / pageSize) : 0;
  }, [data]);

  // Filter todos based on search
  const filteredTodos = useMemo(() => {
    if (!data?.items || !searchQuery.trim()) return data?.items || [];

    const query = searchQuery.toLowerCase();
    return data.items.filter(
      (todo) =>
        todo.title.toLowerCase().includes(query) ||
        (todo.description && todo.description.toLowerCase().includes(query))
    );
  }, [data, searchQuery]);

  // Handle errors
  const handleError = (err: unknown, context: string) => {
    const message = err instanceof Error ? err.message : `${context} failed`;
    toast.error(`✗ ${message}`);
    console.error(context, err);
  };

  // Handle toggle todo
  const handleToggle = async (todo: TodoDto) => {
    try {
      await updateMutation.mutateAsync({
        id: todo.id,
        completed: !todo.completed,
      });
      toast.success(todo.completed ? '↩ Todo marked as incomplete' : '✓ Todo marked as complete');
    } catch (err) {
      handleError(err, 'Failed to update todo');
    }
  };

  // Handle delete todo - show confirmation modal
  const handleDeleteClick = (todo: TodoDto) => {
    setDeleteTarget(todo);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('✓ Todo deleted successfully');
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      handleError(err, 'Failed to delete todo');
    }
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isOperating =
    createMutation.isPending || deleteMutation.isPending || updateMutation.isPending || isLoading;

  if (error) {
    return (
      <div className="todos-page">
        <div className="todos-page__header">
          <h1 className="todos-page__title">My Todos</h1>
        </div>
        <Alert variant="error">
          <h2>Failed to load todos</h2>
          <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
          <Button onClick={() => window.location.reload()} variant="primary" className="mt-4">
            ↻ Refresh Page
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="todos-page">
      {/* Page Header */}
      <div className="todos-page__header">
        <h1 className="todos-page__title">📋 My Todos</h1>
        <p className="todos-page__subtitle">Manage your tasks efficiently</p>
      </div>

      {/* Create Todo Form Section */}
      <section className="todos-section" aria-labelledby="create-section">
        <h2 id="create-section" className="sr-only">
          Create New Todo
        </h2>
        <Card className="create-todo-card">
          <div className="card__body">
            <h3 className="card-section-title">Create a New Todo</h3>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as unknown as HTMLFormElement;
                const formData = new FormData(form);
                const title = formData.get('title') as string;
                const description = formData.get('description') as string;

                if (!title.trim()) {
                  toast.warning('Please enter a todo title');
                  return;
                }

                (async () => {
                  try {
                    const command: CreateTodoCommand = {
                      title: title.trim(),
                      description: description?.trim() || null,
                    };
                    await createMutation.mutateAsync(command);
                    (e.target as HTMLFormElement).reset();
                    toast.success('✓ Todo created successfully!');
                  } catch (err) {
                    handleError(err, 'Failed to create todo');
                  }
                })();
              }}
              columns={2}
            >
              <FormField label="Title *" required id="todo-title">
                <Input
                  id="todo-title"
                  name="title"
                  placeholder="What needs to be done?"
                  disabled={createMutation.isPending}
                />
              </FormField>

              <FormField label="Description" id="todo-description">
                <Input
                  id="todo-description"
                  name="description"
                  placeholder="Add more details..."
                  disabled={createMutation.isPending}
                />
              </FormField>

              <div className="form-actions">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={createMutation.isPending}
                  isLoading={createMutation.isPending}
                >
                  {createMutation.isPending ? 'Adding...' : '✓ Add Todo'}
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </section>

      {/* Search Section */}
      <section className="todos-section" aria-labelledby="search-section">
        <h2 id="search-section" className="sr-only">
          Search Todos
        </h2>
        <Card>
          <div className="card__body">
            <SearchForm
              value={searchQuery}
              onSearch={setSearchQuery}
              isLoading={isLoading}
              placeholder="Search todos by title or description..."
              debounceDelay={300}
              showClearButton
              showSubmitButton
            />
          </div>
        </Card>
      </section>

      {/* Todo List Section */}
      <section className="todos-section" aria-labelledby="todos-list-section">
        <h2 id="todos-list-section" className="sr-only">
          Todo List
        </h2>

        <Suspense
          fallback={
            <div className="loading-state">
              <div className="loading-state__icon">
                <Spinner size="lg" />
              </div>
              <p>Loading...</p>
            </div>
          }
        >
          <TodoListContent
            todos={searchQuery.trim() ? filteredTodos : data?.items || []}
            isLoading={isLoading}
            onToggle={handleToggle}
            onDelete={handleDeleteClick}
            isUpdating={isOperating}
          />
        </Suspense>

        {/* Pagination */}
        {totalPages > 1 && !searchQuery.trim() && (
          <div className="todos-pagination">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onChange={handlePageChange}
              isLoading={isOperating}
            />
          </div>
        )}
      </section>

      {/* Stats Section */}
      {data && (
        <section className="todos-section">
          <Card>
            <div className="card__body">
              <div className="todos-stats">
                <p>
                  Showing <strong>{data.items.length}</strong> of <strong>{data.total}</strong>{' '}
                  todos
                </p>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && deleteTarget && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeleteTarget(null);
          }}
          title="Delete Todo?"
          size="sm"
          closeOnBackdropClick={false}
        >
          <div className="modal__body">
            <p>Are you sure you want to delete this todo?</p>
            <p className="font-semibold">"{deleteTarget.title}"</p>
            <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
          </div>
          <div className="modal__footer modal__footer--between">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeleteTarget(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              isLoading={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : '🗑 Delete'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default TodoPage;
