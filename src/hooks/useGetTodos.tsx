import { useEffect, useState } from 'react';
import { type TodoType } from '../types';
import { URL } from '../constants';

function useGetTodos() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todosError, setTodoError] = useState<string | null>(null);
  const [shouldFetch, setShouldFetch] = useState(true);

  const handleFetch = (newShouldFetch: boolean) => {
    setShouldFetch(newShouldFetch);
  };

  useEffect(() => {
    if (!shouldFetch) return;

    fetch(URL + '/todo')
      .then(async (response) => {
        if (response.status !== 200) {
          const { error } = await response.json();
          return setTodoError(error);
        }

        return response.json();
      })
      .then((data) => {
        if (null == data) return setTodoError('Could not connect to the database');

        setTodos(data);
      })
      .catch(() => setTodoError('Could not connect to the database.'))
      .finally(() => {
        handleFetch(false);
      });
  }, [shouldFetch]);

  return {
    todos,
    todosError,
    handleFetch,
  };
}

export default useGetTodos;
