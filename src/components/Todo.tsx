import { TodoType } from '../types';
import { useContext } from 'react';
import '../styles/index.css';
import TodoContext from '../context/context';
import { completeTodo } from '../lib/db';
import { toast } from 'sonner';

function Todo({ todo }: { todo: TodoType }) {
  const { handleFetch } = useContext(TodoContext);

  const handleChange = () => {
    completeTodo(todo, handleFetch);

    if (!todo.completed) toast.info('🎉Todo completed🎉');
  };
  return (
    <div className={`todo ${todo.completed === 1 ? 'todo-completed' : ''}`} key={todo.id}>
      <input
        type='checkbox'
        name='todo-complete'
        id={todo.id.toString()}
        defaultChecked={todo.completed === 1}
        onChange={handleChange}
      />
      <label htmlFor={todo.id.toString()} className='todo-title'>
        {todo.title}
      </label>
    </div>
  );
}

export default Todo;
