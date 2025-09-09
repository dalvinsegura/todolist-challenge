import { useQuery,   useMutation } from "@tanstack/react-query";
import { Todo } from "../models/Todo";
import { todoService } from "../../../core/api/api";
import { queryClient } from "../../../core/state/global";
import { useNavigation } from "@react-navigation/native";


const useHomeViewModel = () => {
    const navigation = useNavigation();

    const getTodos = () => {
  const { data, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
        return await todoService.fetchTodos();
    },
  });

    return {
    todos: data || [],
    isLoading,
  };
};

const createTodoMutation = useMutation({
    mutationFn: async (todo: Todo) => {
        return await todoService.createTodo(todo);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
        
    },
});

const updateTodoMutation = useMutation({
    mutationFn: async (updatedTodo: Todo) => {
        return await todoService.updateTodo(updatedTodo.id, updatedTodo);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
});

const deleteTodoMutation = useMutation({
    mutationFn: async (id: number) => {
        return await todoService.deleteTodo(id);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
});

return {
    ...getTodos(),
    createTodo: createTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
}
}

export default useHomeViewModel;
