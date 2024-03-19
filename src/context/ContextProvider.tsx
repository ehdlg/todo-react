import { type PropsWithChildren } from 'react';
import useGetTodos from '../hooks/useGetTodos';
import TodoContext from './context';

function TodoProvider({ children }: PropsWithChildren) {
  const { todos, todosError, handleFetch } = useGetTodos();

  return (
    <TodoContext.Provider value={{ todos, todosError, handleFetch }}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
