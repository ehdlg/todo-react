import TodoList from './components/TodoList';
import Header from './components/Header';
import NewTodo from './components/NewTodo';
import TodoProvider from './context/ContextProvider';
import './styles/index.css';

function App() {
  return (
    <TodoProvider>
      <Header />
      <NewTodo />
      <TodoList />
    </TodoProvider>
  );
}

export default App;
