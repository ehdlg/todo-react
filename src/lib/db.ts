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

export const deleteTodos = async (ids: number[], handleFetch: (shouldFetch: boolean) => void) => {
  if (ids.length === 0) return;

  const fetchOptions = {
    method: 'DELETE',
  };

  if (!confirm('Are you sure you want to clear all the completed todos?')) return;

  const fetchPromises = ids.map(async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todo/${id}`, fetchOptions);
      const data = await response.json();
      if (response.status !== 200) console.error(data.message);
    } catch (e) {
      console.error(e);
    }
  });

  Promise.all(fetchPromises)
    .then(() => handleFetch(true))
    .catch(() => console.error('Something went wrong'));
};
