import type { TodoItemComponentProps } from "@/types";
import { type FC } from "react";

const TodoItemComponent:FC<TodoItemComponentProps> = ({item}) => {

    return(
        <li key={item.id}>Title: {item.title}, Content: {item.content} </li>
    )
};

export default TodoItemComponent;