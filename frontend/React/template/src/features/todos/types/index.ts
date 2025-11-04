/**
 * Todo Feature Types
 * Defines all TypeScript interfaces for the todos feature
 */

export interface TodoDto {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date | null;
}

export interface CreateTodoCommand {
  title: string;
  description?: string | null;
}

export interface UpdateTodoCommand {
  id: string;
  title?: string | null;
  description?: string | null;
  completed?: boolean;
}

export interface PaginatedTodosDto {
  items: TodoDto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TodosFilterOptions {
  page?: number;
  pageSize?: number;
  completed?: boolean;
  searchText?: string;
}
