import type { FC } from "react";

interface TodoItemProps {
    name: string;
    age: string;
  }

const TodoItemComponent:FC<TodoItemProps> = ({name, age}) => {

    return(
        <>
            <div>
                <h1></h1>
            </div>
        </>
    )
};