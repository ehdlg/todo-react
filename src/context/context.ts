import { createContext } from 'react';
import { type ContextType } from '../types';

export default createContext<ContextType>({
  todos: [],
  handleFetch: () => {},
  todosError: null,
});
