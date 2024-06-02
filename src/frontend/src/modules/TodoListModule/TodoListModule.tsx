import TodoApiService from "@/services/api/TodoApiService";
import type { TodoItemRequest, TodoItemResponse } from "@/types";
import { useState, useEffect } from "react";
import TodoItemComponent from "./components/TodoItemComponent/TodoItemComponent";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Input } from "antd";

const TodoListModule = () => {

    const [todos, setTodos] = useState<TodoItemResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState('');

    const deleteTodo = (id: string) => {
        console.log('module.deleteTodo')
        TodoApiService.deleteTodo(id)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)));
    };

    const onClickAdd = () => {
        console.log('module.clickAdd')
        const newTodo : TodoItemRequest = {
            title: inputValue,
            content: inputValue
        };

        console.log(newTodo);

        TodoApiService.createTodo(newTodo)
        .then((response:TodoItemResponse) => setTodos([...todos, response]));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('module.handleInputChange');
        console.log(event.target.value);
        setInputValue(event.target.value);
    };

    useEffect(() => {
        console.log('module.useEffect')
        TodoApiService.getTodos().then((todos) => {
            setTodos(todos);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <Flex gap="small">
                <Input placeholder="Todo title" value={inputValue} onChange={handleInputChange} />
                <Button type="primary" icon={<PlusOutlined />} size="middle" onClick={onClickAdd}>
                Add todo
                </Button>
            </Flex>

            <Divider orientation="left">Items</Divider>

            {loading
                ? <p>Loading...</p>
                : 
                    <Flex gap="small" vertical={true}>
                        {todos.map((todo) => (
                            <TodoItemComponent key={todo.id} item={todo} onDelete={deleteTodo} />
                            ))}
                    </Flex>}
        </div>
    )
}

export default TodoListModule;