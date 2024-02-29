import type { TodoListComponentProps } from "@/types";
import type { FC } from "react";
import TodoItemComponent from "../TodoItemComponent/TodoItemComponent";

const TodoListComponent:FC<TodoListComponentProps> = ({todoList}) => {

    return(
        <>
            <ul>
                {todoList.map((todo) => (
                    <TodoItemComponent item={todo} />
                ))}
            </ul>
        </>
    )
};

export default TodoListComponent;