import { useState, useEffect } from 'react';
import './App.css';

type TodoType = {
  id: number;
  title: string;
  content: string;
  completed: Date | null;
  created: string;
};
type TodoResponse = {
  todos: TodoType[];
  length: number;
};
function App() {
  const [todos, setTodos] = useState<TodoResponse>({ todos: [], length: 0 });

  useEffect(() => {
    fetch('http://localhost:3000/api/todo')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  console.log(todos.todos);

  console.log(new Date(todos?.todos[0]?.created));

  return (
    <>
      <h1>Welcome to the Todo List</h1>
      <ul>
        {todos.length > 0 &&
          todos.todos.map((todo) => {
            return <li>{todo.title}</li>;
          })}
      </ul>
    </>
  );
}

export default App;
