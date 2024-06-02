import type { TodoItemComponentProps } from "@/types";
import { useState, type FC } from "react";
import { Button, Checkbox, Col, Input, Row } from 'antd';
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import TodoApiService from "@/services/api/TodoApiService";
import './TodoItemComponent.css';

const TodoItemComponent:FC<TodoItemComponentProps> = ({item, onDelete}) => {

    const [isDisabled, setIsDisabled] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(item.title);
    const [todoItem, setTodoItem] = useState(item);
    
    const onChangeCheckbox = (e:CheckboxChangeEvent) => {
        console.log('onChangeCheckbox')
        setIsDisabled(!e.target.checked);
        setIsEditing(false);
      };
    
    const onClickDelete = () => {
        console.log('onClickDelete')
        onDelete(todoItem.id)
    }

    const onEdit = async () => {
        console.log('onEdit')
        if(isEditing){
            const a = await TodoApiService.updateTodo(todoItem.id, {title: inputValue, content: inputValue})
            setIsEditing(false);
            setIsDisabled(true);
            setTodoItem(a);
            return;
        }
        
        setIsEditing(true);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInputChange')
        console.log(event.target.value)
        setInputValue(event.target.value);
    };

    return(
        <>
            <Row>
                <Col flex={8}>
                    <Checkbox checked={!isDisabled} onChange={onChangeCheckbox}>
                    {isEditing
                        ? <Input placeholder="Todo title" value={inputValue} onChange={handleInputChange}/>
                        : todoItem.title}         
                    </Checkbox>
                    <p></p>
                </Col>

                <Col flex={2}>
                    <Button type="primary" onClick={onEdit} disabled={isDisabled}>
                        {isEditing ? "Submit" : "Edit"}
                    </Button>
                    <Button onClick={onClickDelete} danger type="primary" disabled={isDisabled}>Delete</Button>
                </Col>
            </Row>
        </>
    )
};

export default TodoItemComponent;