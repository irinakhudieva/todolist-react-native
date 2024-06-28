import { useAppDispatch } from "@/shared/store/hooks/redux";
import { useState } from "react";
import { createTodo, removeTodo, syncTodoToServer, toggleCompleted, updateTodo } from "../store/reducers/todo.reducer";
import { useSelector } from "react-redux";
import { getTodos } from "../store/selectors/getTodos";
import { getTodosLoader } from "../store/selectors/getTodosLoader";
import { getTodosError } from "../store/selectors/getTodosError";

export default function useTodoList() {
    const [todoText, setTodoText] = useState('');

    const dispatch = useAppDispatch();

    const todos = useSelector(getTodos);
    const isLoading = useSelector(getTodosLoader);
    const error = useSelector(getTodosError);

    const addTodo = () => {
        if(todoText) {
            const newTodo = {
                todo: todoText,
                completed: false
            }
            dispatch(createTodo(newTodo));  
            setTodoText(''); 
        }
    }


    const onChangeCompleted = (id: string, completed: boolean) => {
        dispatch(toggleCompleted({ id, completed }));
    }
    
    const onRemoveTodo = (id: string) => {
        dispatch(removeTodo(id));
    }
    
    const onEditTodo = (id: string, editText: string) => {
        dispatch(updateTodo({ id, editText }));
    }

    const onSendToServer = (id: string) => {
        dispatch(syncTodoToServer(id));
    }

    return {
        todos, 
        isLoading, 
        error,
        addTodo,
        onChangeCompleted,
        onRemoveTodo,
        onEditTodo,
        todoText,
        setTodoText,
        onSendToServer
    }
}