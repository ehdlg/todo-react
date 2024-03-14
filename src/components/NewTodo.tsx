import { useContext, useRef, useState } from 'react';
import TodoContext from '../context/context';
import { placeholderTasks } from '../contants';
import Error from './Error';

function NewTodo() {
  const [error, setError] = useState<null | string>(null);
  const { handleFetch } = useContext(TodoContext);
  const inputRef = useRef(null);

  const addNewTodo = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (inputRef == null || inputRef.current == null) return;

    const title = inputRef.current.value;

    if (!title) {
      setError('You must write a title for the todo');
      return;
    }

    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    };

    const response = await fetch('http://localhost:3000/api/todo', fetchOptions);

    const data = await response.json();

    if (response.status !== 200) {
      setError(data.error);
    }

    handleFetch(true);

    inputRef.current.value = '';
  };

  return (
    <>
      <form className='add-todo'>
        <input
          type='text'
          name='new-todo'
          id='new-todo'
          placeholder={`${
            placeholderTasks[Math.floor(placeholderTasks.length * Math.random())]
          }...`}
          ref={inputRef}
        />

        <button type='submit' onClick={(e) => addNewTodo(e)}>
          +
        </button>
      </form>
      {error && <Error msg={error} />}
    </>
  );
}

export default NewTodo;
