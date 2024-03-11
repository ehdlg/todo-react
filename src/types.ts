export type TodoType = {
  id: number;
  title: string;
  completed: number;
};

export type ContextType = {
  todos:TodoType[], error:string | null, loading: boolean | null }
}