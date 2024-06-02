import axios from 'axios';
import type { TodoItemRequest, TodoItemResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const apiClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
});

const createTodo = async (todoData:TodoItemRequest) => {
    try {
        const response = await apiClient.post('/todos', todoData);
        return response.data as TodoItemResponse;
    } catch (error) {
        throw new Error('Failed to create todo');
    }
};

const getTodos = async () => {
    try {
        const response = await apiClient.get('/todos');
        return response.data as TodoItemResponse[];
    } catch (error) {
        throw new Error('Failed to get todos');
    }
};

const getTodo = async (id:string) => {
    try {
        const response = await apiClient.get(`/todos/${id}`);
        return response.data as TodoItemResponse;
    } catch (error) {
        throw new Error('Failed to get todo');
    }
};

const updateTodo = async (id:string, todoData:TodoItemRequest) => {
    try {
        const response = await apiClient.put(`/todos/${id}`, todoData);
        return response.data as TodoItemResponse;
    } catch (error) {
        throw new Error('Failed to update todo');
    }
};

const deleteTodo = async (id:string) => {
    try {
        await apiClient.delete(`/todos/${id}`);
    } catch (error) {
        throw new Error('Failed to delete todo');
    }
};

const TodoApiService = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
};

export default TodoApiService;