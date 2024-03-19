import TodoList from './components/TodoList';
import Main from './components/Main';
import Header from './components/Header';
import NewTodo from './components/NewTodo';
import TodoProvider from './context/ContextProvider';
import { Toaster } from 'sonner';
import { toasterOptions } from './contants';
import './styles/index.css';

function App() {
  return (
    <TodoProvider>
      <Toaster {...toasterOptions} />
      <Main>
        <Header />
        <NewTodo />
        <TodoList />
      </Main>
    </TodoProvider>
  );
}

export default App;
