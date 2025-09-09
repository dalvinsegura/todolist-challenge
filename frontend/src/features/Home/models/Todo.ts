export interface Todo {
  id: number;
  title: string;
  content: string;  
  completed: boolean;

}

export interface TodoMutable {
    title: string;
    content: string;  
    completed: boolean;
    }