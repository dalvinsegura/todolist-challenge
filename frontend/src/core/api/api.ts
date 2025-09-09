import axios from 'axios';
import { Todo, TodoMutable } from '@features/Home/models/Todo';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

const fetchTodos = async (): Promise<Todo[]> => {
    const response = await api.get('/todo/');
    return response.data;
}

const fetchTodoById = async (id: number): Promise<Todo> => {
    const response = await api.get(`/todo/${id}`);
    return response.data;
}

const createTodo = async (todo: TodoMutable) => {
    const response = await api.post('/todo/', todo);
    return response.data;
}

const updateTodo = async (id: number, todo: TodoMutable) => {
    const response = await api.put(`/todo/${id}`, todo);
    return response.data;
}

const deleteTodo = async (id: number): Promise<Todo> => {
    const response = await api.delete(`/todo/${id}`);
    return response.data;
}

export const todoService = {
    fetchTodos,
    fetchTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
};