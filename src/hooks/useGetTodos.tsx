import { useEffect, useState } from 'react';

type TodoType = {
  id: number;
  title: string;
  content: string;
  completed: Date | null;
  created: string;
};

function useGetTodos() {
  const [todos, setTodos] = useState<TodoType | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/todo')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, [todos]);
}
