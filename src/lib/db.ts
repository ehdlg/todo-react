import { TodoType } from '../types';

export const completeTodo = async (todo: TodoType, handleFetch: (shouldFetch: boolean) => void) => {
  const fetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !todo.completed }),
  };
  const response = await fetch(`http://localhost:3000/api/todo/${todo.id}/`, fetchOptions);
  await response.json();

  handleFetch(true);
};

export const deleteTodos = (ids: number[], handleFetch: (shouldFetch: boolean) => void) => {
  if (ids.length === 0) return;

  const fetchOptions = {
    method: 'DELETE',
  };

  if (!confirm('Are you sure you want to clear all the completed todos?')) return;

  ids.forEach(async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todo/${id}`, fetchOptions);
      const data = await response.json();
      if (response.status !== 200) console.error(data.error);
    } catch (e) {
      console.error(e);
    }
  });

  handleFetch(true);
};
