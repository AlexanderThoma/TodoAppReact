import TodoApiService from "@/services/api/TodoApiService";
import type { TodoItemResponse } from "@/types";
import { useState, useEffect } from "react";
import TodoListComponent from "./components/TodoListComponent/TodoListComponent";

const TodoListModule = () => {

    const [todos, setTodos] = useState<TodoItemResponse[]>([]);

    useEffect(() => {
        TodoApiService.getTodos().then((todos) => {
            setTodos(todos);
        });
    }, []);

    return (
        <>
            <div className="todo-list-container">
                <h1>List of all todo items</h1>
                <TodoListComponent todoList={todos} />
            </div>
        </>
    );
}

export default TodoListModule;