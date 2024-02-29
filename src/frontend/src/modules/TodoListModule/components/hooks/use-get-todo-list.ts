import TodoApiService from "@/services/api/TodoApiService";
import type { TodoItemResponse } from "@/types";

// ????

const useGetTodoList = async () => {
    
    const result = await TodoApiService.getTodos() as TodoItemResponse[];

    // TODO: do some validation here

    return result;
};

export default useGetTodoList;