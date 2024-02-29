import type { FC } from "react";

interface TodoItemProps {
    name: string;
    age: string;
  }

const TodoListComponent:FC<TodoItemProps> = ({name, age}) => {

    return(
        <>
            <div>
                <h1></h1>
            </div>
        </>
    )
};