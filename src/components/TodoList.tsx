import { useState, useContext } from 'react';
import Error from './Error';
import Todo from './Todo';
import { filters } from '../contants';
import TodoContext from '../context/context';
import { deleteTodos } from './lib/db';
import { FilterType, TodoType } from '../types';
import { filterTodos } from './lib/filterTodo';

const Content = ({ filteredTodos }: { filteredTodos: TodoType[] }) => {
  const noTodos = filteredTodos.length === 0;

  return (
    <>
      {noTodos ? (
        <h2>There are no todos with the current filter.</h2>
      ) : (
        filteredTodos.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })
      )}
    </>
  );
};

const Filters = ({ handleFilter }: { handleFilter: (newFilter: FilterType) => void }) => {
  return (
    <div className='todo-list-footer__filter'>
      {filters.map((filter: FilterType) => (
        <button key={filter} onClick={() => handleFilter(filter)}>
          {filter}
        </button>
      ))}
    </div>
  );
};

const Footer = ({
  deleteCompletedTodos,
  shouldShowDeleteButton,
  handleFilter,
}: {
  deleteCompletedTodos: () => void;
  shouldShowDeleteButton: boolean;
  handleFilter: (newFilter: FilterType) => void;
}) => {
  return (
    <div className='todo-list-footer'>
      <button
        className={`todo-list-footer__delete_all ${shouldShowDeleteButton ? '' : 'hidden'}`}
        onClick={deleteCompletedTodos}
      >
        Delete completed todos
      </button>

      <Filters handleFilter={handleFilter} />
    </div>
  );
};

TodoList.Content = Content;
TodoList.Footer = Footer;
TodoList.Content = Content;

function TodoList() {
  const { todos, todosError, handleFetch } = useContext(TodoContext);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  if (todosError) return <Error msg={todosError} />;

  const filteredTodos = filterTodos[currentFilter](todos);
  const completedTodos = filterTodos.completed(todos);
  const shouldShowDeleteButton = currentFilter !== 'active' && completedTodos.length > 0;

  const handleFilter = (newFilter: FilterType) => {
    setCurrentFilter(newFilter);
  };

  const deleteCompletedTodos = () => {
    deleteTodos(
      completedTodos.map((todo) => todo.id),
      handleFetch
    );
  };

  return (
    <div className='todo-list'>
      <TodoList.Content filteredTodos={filteredTodos} />
      <TodoList.Footer
        deleteCompletedTodos={deleteCompletedTodos}
        shouldShowDeleteButton={shouldShowDeleteButton}
        handleFilter={handleFilter}
      />
    </div>
  );
}

export default TodoList;
