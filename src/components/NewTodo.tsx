import { useContext, useRef } from 'react';
import TodoContext from '../context/context';
import { validateNewTodo } from '../utils/validation';
import { toast } from 'sonner';

function NewTodo() {
  const { handleFetch, todosError } = useContext(TodoContext);
  const inputRef = useRef<HTMLInputElement>(null);

  if (todosError) return null;

  const addNewTodo = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (inputRef == null || inputRef.current == null) return;

    const title = inputRef.current.value;

    if (!validateNewTodo(title)) return;

    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    };

    const response = await fetch('http://localhost:3000/api/todo', fetchOptions);

    const data = await response.json();

    const toastType = response.status === 200 ? 'success' : 'error';

    toast[toastType](data.message);

    handleFetch(true);

    inputRef.current.value = '';
  };

  return (
    <>
      <form className='new-todo'>
        <input
          type='text'
          name='new-todo'
          id='new-todo'
          placeholder={'Create a new todo...'}
          ref={inputRef}
        />

        <button type='submit' onClick={(e) => addNewTodo(e)}>
          +
        </button>
      </form>
    </>
  );
}

export default NewTodo;
