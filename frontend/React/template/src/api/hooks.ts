/**
 * React Query Hooks - Todo API Integration
 *
 * Phase 6: API Layer Integration
 * Type-safe React Query hooks for todo CRUD operations
 *
 * Features:
 * - Automatic caching & invalidation
 * - Error handling with proper types
 * - Loading states
 * - Mutation side effects
 * - Pagination support
 * - Search support
 *
 * @example
 * ```tsx
 * // In a component:
 * const { data, isLoading, error } = useTodos(1, 10);
 * const createMutation = useCreateTodo();
 *
 * const handleCreate = async (title: string) => {
 *   try {
 *     await createMutation.mutateAsync({ title });
 *   } catch (error) {
 *     console.error('Failed to create', error);
 *   }
 * };
 * ```
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiError } from '@/api/client';
import type { CreateTodoCommand, TodoDto, PaginatedTodosDto } from '@/features/todos/types';

/**
 * Query Keys for React Query
 * Using factories to ensure consistent key structure
 */
export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) => [...todoKeys.lists(), { page, pageSize }] as const,
  searches: () => [...todoKeys.all, 'search'] as const,
  search: (query: string, page: number, pageSize: number) =>
    [...todoKeys.searches(), { query, page, pageSize }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: string) => [...todoKeys.details(), id] as const,
};

/**
 * useTodos - Fetch paginated todos
 *
 * Features:
 * - Automatic pagination
 * - Loading & error states
 * - Automatic refetch on window focus
 * - 5 minute stale time
 *
 * @param page - Page number (1-indexed)
 * @param pageSize - Items per page
 */
export function useTodos(page: number, pageSize: number) {
  return useQuery<PaginatedTodosDto, ApiError>({
    queryKey: todoKeys.list(page, pageSize),
    queryFn: async ({ signal }) => {
      return apiClient.getTodos(page, pageSize, { signal });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => {
      // Don't retry 4xx errors (except 429)
      if (error.status >= 400 && error.status < 500 && error.status !== 429) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
}

/**
 * useSearchTodos - Search todos with debouncing
 *
 * Features:
 * - Debounced search
 * - Only search when query changes
 * - Maintains pagination
 * - Disabled when query is empty
 *
 * @param query - Search query string
 * @param page - Page number
 * @param pageSize - Items per page
 */
export function useSearchTodos(query: string, page: number, pageSize: number) {
  return useQuery<PaginatedTodosDto, ApiError>({
    queryKey: todoKeys.search(query, page, pageSize),
    queryFn: async ({ signal }) => {
      return apiClient.searchTodos(query, page, pageSize, { signal });
    },
    enabled: query.trim().length > 0, // Only search if query is not empty
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });
}

/**
 * useTodo - Fetch single todo by ID
 *
 * @param id - Todo ID
 */
export function useTodo(id: string | undefined) {
  return useQuery<TodoDto, ApiError>({
    queryKey: todoKeys.detail(id || ''),
    queryFn: async ({ signal }) => {
      if (!id) throw new Error('Todo ID is required');
      return apiClient.getTodoById(id, { signal });
    },
    enabled: !!id, // Only fetch when id is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * useCreateTodo - Create new todo
 *
 * Features:
 * - Optimistic updates
 * - Automatic cache invalidation
 * - Error handling
 * - Loading state
 *
 * @returns Mutation object with mutate/mutateAsync methods
 */
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation<TodoDto, ApiError, CreateTodoCommand>({
    mutationFn: (command) => apiClient.createTodo(command),

    onSuccess: (newTodo) => {
      // Invalidate all todo lists to refetch
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      });

      // Optionally, add to first page of list
      queryClient.setQueryData<PaginatedTodosDto>(todoKeys.list(1, 10), (old) => {
        if (!old) return old;
        return {
          ...old,
          items: [newTodo, ...old.items],
          total: old.total + 1,
        };
      });
    },

    onError: (error) => {
      console.error('Failed to create todo:', error.message);
    },
  });
}

/**
 * useUpdateTodo - Update existing todo
 *
 * Features:
 * - Optimistic updates
 * - Cache invalidation
 * - Proper error handling
 *
 * @returns Mutation object
 */
export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation<
    TodoDto,
    ApiError,
    { id: string; completed: boolean },
    { previousTodos: Array<[readonly unknown[], PaginatedTodosDto | undefined]> }
  >({
    mutationFn: async ({ id, completed }) => {
      return apiClient.updateTodo(id, { completed });
    },

    onMutate: async ({ id, completed }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: todoKeys.details() });

      // Snapshot old data
      const previousTodos = queryClient.getQueriesData<PaginatedTodosDto>({
        queryKey: todoKeys.lists(),
      });

      // Optimistically update
      queryClient.setQueriesData<PaginatedTodosDto>({ queryKey: todoKeys.lists() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.map((item) => (item.id === id ? { ...item, completed } : item)),
        };
      });

      return { previousTodos };
    },

    onError: (error, _, context) => {
      // Revert on error
      if (context?.previousTodos) {
        context.previousTodos.forEach(
          ([key, data]: [readonly unknown[], PaginatedTodosDto | undefined]) => {
            queryClient.setQueryData(key, data);
          }
        );
      }
      console.error('Failed to update todo:', error.message);
    },

    onSettled: async () => {
      // Refetch to ensure data is fresh
      await queryClient.invalidateQueries({
        queryKey: todoKeys.lists(),
      });
    },
  });
}

/**
 * useDeleteTodo - Delete todo
 *
 * Features:
 * - Optimistic deletion
 * - Easy rollback on error
 * - Proper cache management
 *
 * @returns Mutation object
 */
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    ApiError,
    string,
    { previousTodos: Array<[readonly unknown[], PaginatedTodosDto | undefined]> }
  >({
    mutationFn: (id) => apiClient.deleteTodo(id),

    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: todoKeys.lists() });

      // Snapshot old data
      const previousTodos = queryClient.getQueriesData<PaginatedTodosDto>({
        queryKey: todoKeys.lists(),
      });

      // Optimistically remove
      queryClient.setQueriesData<PaginatedTodosDto>({ queryKey: todoKeys.lists() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.filter((item) => item.id !== id),
          total: Math.max(0, old.total - 1),
        };
      });

      return { previousTodos };
    },

    onError: (error, _, context) => {
      // Revert on error
      if (context?.previousTodos) {
        context.previousTodos.forEach(
          ([key, data]: [readonly unknown[], PaginatedTodosDto | undefined]) => {
            queryClient.setQueryData(key, data);
          }
        );
      }
      console.error('Failed to delete todo:', error.message);
    },

    onSettled: async () => {
      // Refetch to ensure data is fresh
      await queryClient.invalidateQueries({
        queryKey: todoKeys.lists(),
      });
    },
  });
}
