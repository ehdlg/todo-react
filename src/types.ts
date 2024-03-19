import { filters } from './constants';

export type FilterType = (typeof filters)[number];

export type TodoType = {
  id: number;
  title: string;
  completed: number;
};

export type ContextType = {
  todos: TodoType[];
  todosError: string | null;
  handleFetch: (shouldFetch: boolean) => void;
};
