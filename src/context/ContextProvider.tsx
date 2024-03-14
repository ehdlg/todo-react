import { type PropsWithChildren, useState } from 'react';
import useGetTodos from '../hooks/useGetTodos';
import TodoContext from './context';

function TodoProvider({ children }: PropsWithChildren) {
  const { todos, loading, todosError, handleFetch } = useGetTodos();

  return (
    <TodoContext.Provider value={{ todos, todosError, loading, handleFetch }}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
