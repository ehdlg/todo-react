import { useState, useContext } from 'react';
import Error from './Error';
import Todo from './Todo';
import { filters } from '../constants';
import TodoContext from '../context/context';
import { deleteTodos } from '../lib/db';
import { FilterType, TodoType } from '../types';
import { filterTodos } from '../lib/filterTodo';
import { toast } from 'sonner';

const Content = ({ filteredTodos }: { filteredTodos: TodoType[] }) => {
  const noTodos = filteredTodos.length === 0;

  return (
    <div className='todo-list'>
      {noTodos ? (
        <h2>There are no todos with the current filter.</h2>
      ) : (
        filteredTodos.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })
      )}
    </div>
  );
};

const Filters = ({
  currentFilter,
  handleFilter,
}: {
  currentFilter: FilterType;
  handleFilter: (newFilter: FilterType) => void;
}) => {
  return (
    <div className='todo-list-footer__filter'>
      {filters.map((filter: FilterType) => (
        <button
          className={`filter ${currentFilter === filter ? 'filter-selected' : ''}`}
          key={filter}
          onClick={() => handleFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const Footer = ({
  deleteCompletedTodos,
  todosLeft,
  handleFilter,
  currentFilter,
}: {
  deleteCompletedTodos: () => void;
  todosLeft: number;
  handleFilter: (newFilter: FilterType) => void;
  currentFilter: FilterType;
}) => {
  return (
    <div className='todo-list-footer'>
      <span>{todosLeft} todos left</span>

      <Filters handleFilter={handleFilter} currentFilter={currentFilter} />
      <button className='todo-list-footer__delete_all' onClick={deleteCompletedTodos}>
        Clear completed
      </button>
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
  const activeTodos = filterTodos.active(todos);

  const handleFilter = (newFilter: FilterType) => {
    setCurrentFilter(newFilter);
  };

  const deleteCompletedTodos = () => {
    if (completedTodos.length === 0) {
      toast.info('There are no completed todos to clear!');
      return;
    }

    const todosIds = completedTodos.map((todo) => todo.id);

    console.log({ todosIds });
    deleteTodos(
      completedTodos.map((todo) => todo.id),
      handleFetch
    );

    toast.success('Succesfully cleared all the completed todos!');
  };

  return (
    <>
      <TodoList.Content filteredTodos={filteredTodos} />
      <TodoList.Footer
        deleteCompletedTodos={deleteCompletedTodos}
        todosLeft={activeTodos.length}
        handleFilter={handleFilter}
        currentFilter={currentFilter}
      />
    </>
  );
}

export default TodoList;
