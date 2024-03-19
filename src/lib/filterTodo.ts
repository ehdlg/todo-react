import { TodoType } from '../types';

export const filterTodos = {
  all: (todos: TodoType[]) => todos,
  active: (todos: TodoType[]) => todos.filter((todo) => todo.completed === 0),
  completed: (todos: TodoType[]) => todos.filter((todo) => todo.completed === 1),
};
