import { TodoType } from '../types';
import { useContext } from 'react';
import '../styles/index.css';
import TodoContext from '../context/context';
import { completeTodo, deleteTodos } from './lib/db';

function Todo({ todo }: { todo: TodoType }) {
  const { handleFetch } = useContext(TodoContext);

  return (
    <div className={`todo ${todo.completed === 1 ? 'todo-completed' : ''}`} key={todo.id}>
      <input
        type='checkbox'
        name='todo-complete'
        id={todo.id.toString()}
        defaultChecked={todo.completed === 1}
        onChange={() => completeTodo(todo, handleFetch)}
      />
      <label htmlFor={todo.id.toString()} className='todo-title'>
        {todo.title}
      </label>
      <button onClick={() => deleteTodos([todo.id], handleFetch)}>Delete todo</button>
    </div>
  );
}

export default Todo;
