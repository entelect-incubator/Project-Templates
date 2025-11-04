import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import type {
  TodoDto,
  CreateTodoCommand,
  UpdateTodoCommand,
  PaginatedTodosDto,
  TodosFilterOptions,
} from '../types';
import { withSpan, addSpanAttributes } from '@/lib/telemetry';
import { globalCacheSignal } from '@/lib/helpers/cache';

const TODOS_QUERY_KEY = ['todos'];

/**
 * Hook to fetch all todos with pagination and caching
 */
export function useTodos(page: number = 1, pageSize: number = 10) {
  return useQuery<PaginatedTodosDto>({
    queryKey: [...TODOS_QUERY_KEY, page, pageSize],
    queryFn: ({ signal }) =>
      withSpan('fetch-todos', async () => {
        const result = await apiClient.getTodos(page, pageSize, { signal });
        addSpanAttributes({
          'todos.page': page,
          'todos.pageSize': pageSize,
          'todos.total': result.total,
        });
        return result;
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to search todos with debounce and caching
 */
export function useTodoSearch(searchQuery: string, page: number = 1, pageSize: number = 10) {
  return useQuery<PaginatedTodosDto>({
    queryKey: [...TODOS_QUERY_KEY, 'search', searchQuery, page, pageSize],
    queryFn: ({ signal }) =>
      withSpan('search-todos', async () => {
        const result = await apiClient.searchTodos(searchQuery, page, pageSize, { signal });
        addSpanAttributes({
          'search.query': searchQuery,
          'search.page': page,
          'search.pageSize': pageSize,
          'search.total': result.total,
        });
        return result;
      }),
    enabled: !!searchQuery.trim(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single todo by ID
 */
export function useTodoById(id: string) {
  return useQuery<TodoDto>({
    queryKey: [...TODOS_QUERY_KEY, id],
    queryFn: ({ signal }) =>
      withSpan('fetch-todo-by-id', async () => {
        const result = await apiClient.getTodoById(id, { signal });
        addSpanAttributes({
          'todo.id': id,
        });
        return result;
      }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to create a new todo
 */
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: CreateTodoCommand) =>
      withSpan('create-todo', async () => {
        const result = await apiClient.createTodo(command);
        addSpanAttributes({
          'todo.title': command.title,
          'todo.id': result.id,
        });
        return result;
      }),
    onSuccess: () => {
      // Invalidate and refetch todos
      queryClient.invalidateQueries({
        queryKey: TODOS_QUERY_KEY,
      });

      // Clear cache
      globalCacheSignal.invalidatePattern(/todos/);
    },
    onError: (error) => {
      console.error('Failed to create todo:', error);
    },
  });
}

/**
 * Hook to update an existing todo
 */
export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: UpdateTodoCommand) =>
      withSpan('update-todo', async () => {
        const result = await apiClient.updateTodo(command.id, command);
        addSpanAttributes({
          'todo.id': command.id,
          'todo.completed': command.completed ?? false,
        });
        return result;
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TODOS_QUERY_KEY,
      });

      // Invalidate specific todo query
      globalCacheSignal.invalidatePattern(/todos/);
    },
    onError: (error) => {
      console.error('Failed to update todo:', error);
    },
  });
}

/**
 * Hook to delete a todo
 */
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      withSpan('delete-todo', async () => {
        await apiClient.deleteTodo(id);
        addSpanAttributes({
          'todo.id': id,
        });
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TODOS_QUERY_KEY,
      });

      // Clear cache
      globalCacheSignal.invalidatePattern(/todos/);
    },
    onError: (error) => {
      console.error('Failed to delete todo:', error);
    },
  });
}

/**
 * Hook for filtering todos with various options
 */
export function useFilteredTodos(
  options: TodosFilterOptions,
  page: number = 1,
  pageSize: number = 10
) {
  return useQuery<PaginatedTodosDto>({
    queryKey: [...TODOS_QUERY_KEY, 'filtered', options, page, pageSize],
    queryFn: ({ signal }) =>
      withSpan('fetch-filtered-todos', async () => {
        const result = await apiClient.getTodos(page, pageSize, { signal });
        addSpanAttributes({
          'filter.completed': options.completed ?? 'all',
          'filter.search': options.searchText ?? 'none',
        });
        return result;
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
