import { filters } from './contants';

export type FilterType = (typeof filters)[number];

export type TodoType = {
  id: number;
  title: string;
  completed: number;
};

export type ContextType = {
  todos: TodoType[];
  activeTodos: TodoType[];
  completedTodos: TodoType[];
  todosError: string | null;
  loading: boolean | null;
  handleFetch: (shouldFetch: boolean) => void;
};
