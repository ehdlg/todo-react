import { toast } from 'sonner';

export const validateNewTodo = (newTodo: string) => {
  if (newTodo === '') {
    toast.error('The new Todo cannot be empty.');

    return false;
  }

  return true;
};
