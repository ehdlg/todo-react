import TodoList from './components/TodoList';
import Header from './components/Header';
import './App.css';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <>
      <Header />
      <AddTodo />
      <TodoList />
    </>
  );
}

export default App;
