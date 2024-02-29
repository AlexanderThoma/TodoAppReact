import axios from 'axios';
import type { TodoItemRequest, TodoItemResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const todoApiService = axios.create({
    baseURL: `${API_BASE_URL}/api`,
});

export const createTodo = async (todoData:TodoItemRequest) => {
    try {
        const response = await todoApiService.post('/todos', todoData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create todo');
    }
};

export const getTodos = async () => {
    try {
        const response = await todoApiService.get('/todos');
        return response.data as TodoItemResponse[];
    } catch (error) {
        throw new Error('Failed to get todos');
    }
};

export const getTodo = async (id:string) => {
    try {
        const response = await todoApiService.get(`/todos/${id}`);
        return response.data as TodoItemResponse;
    } catch (error) {
        throw new Error('Failed to get todo');
    }
};

export const updateTodo = async (id:string, todoData:TodoItemRequest) => {
    try {
        const response = await todoApiService.put(`/todos/${id}`, todoData);
        return response.data as TodoItemResponse;
    } catch (error) {
        throw new Error('Failed to update todo');
    }
};

export const deleteTodo = async (id:string) => {
    try {
        await todoApiService.delete(`/todos/${id}`);
    } catch (error) {
        throw new Error('Failed to delete todo');
    }
};