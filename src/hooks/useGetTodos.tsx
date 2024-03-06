import { useEffect, useState } from 'react';
import { type TodoType } from '../types';

function useGetTodos() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todosError, setTodoError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState(true);

  const handleFetch = (newShouldFetch: boolean) => {
    setShouldFetch(newShouldFetch);
  };

  useEffect(() => {
    if (!shouldFetch) return;

    setLoading(true);

    fetch('http://localhost:3000/api/todo')
      .then(async (response) => {
        if (response.status !== 200) {
          const { error } = await response.json();
          return setTodoError(error);
        }

        return response.json();
      })
      .then((data) => setTodos(data))
      .catch(() => setTodoError('Could not connect to the database.'))
      .finally(() => {
        setLoading(false);
        handleFetch(false);
      });
  }, [shouldFetch]);

  return {
    todos,
    loading,
    todosError,
    handleFetch,
  };
}

export default useGetTodos;
