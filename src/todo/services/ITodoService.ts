import { ITodo } from "../store/reducers/todo.reducer";
import { TodoResponse } from "./response/todo.response";

export default interface ITodoService {
    fetchAllTodo(): Promise<TodoResponse | undefined>,
    createTodo(todo: {todo: string, completed: boolean}): Promise<ITodo | undefined>,
    toggleCompleted(id: string, completed: boolean): Promise<ITodo | undefined>,
    updateTodo(todo: {editText: string, id: string}): Promise<ITodo | undefined>,
    removeTodo(id: string): Promise<void | undefined>,
    syncTodo?(id: string): Promise<ITodo | undefined>
}