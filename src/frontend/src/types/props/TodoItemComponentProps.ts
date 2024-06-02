import type { TodoItemResponse } from "@/types";

type TodoItemComponentProps = {
    item: TodoItemResponse;
    onDelete: (id: string) => void;
}

export type { TodoItemComponentProps };