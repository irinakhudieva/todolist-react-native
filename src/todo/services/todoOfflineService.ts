import "reflect-metadata";
import { inject, injectable } from "inversify";
import ITodoService from "./ITodoService";
import { TodoResponse } from "./response/todo.response";
import { ITodo } from "../store/reducers/todo.reducer";
import { OFFLINE_ENTITY_TYPES } from "@/offline/entities/offline-entity";
import { IOfflineStorageManager, OfflineStorageManager } from "@/offline/services/offline.storage.manager";


@injectable()
export default class TodoOfflineService implements ITodoService {

    @inject(OfflineStorageManager)
    protected _offlineStorage: IOfflineStorageManager;

    async fetchAllTodo(): Promise<TodoResponse | undefined> {
        return await this._offlineStorage.getFromOffline(
            OFFLINE_ENTITY_TYPES.TODOS
        ) || undefined
    }

    async createTodo(todo: {todo: string, completed: boolean}): Promise<ITodo | undefined> {
        const todos = await this._offlineStorage.getFromOffline<ITodo[]>(
            OFFLINE_ENTITY_TYPES.TODOS
        )

        const newTodo = {
            id: Date.now().toLocaleString(),
            todo: todo.todo,
            completed: todo.completed,
            isSended: false
        }
            
        todos.push(newTodo);

        await this._offlineStorage.setToOffline(
            OFFLINE_ENTITY_TYPES.TODOS,
            todos
        )

        return newTodo; 
    }
    
    async toggleCompleted(id: string): Promise<ITodo | undefined> {
        const todos = await this._offlineStorage.getFromOffline<ITodo[]>(
            OFFLINE_ENTITY_TYPES.TODOS
        ) 

        const changeTodos = todos.map((item) => item.id === id ? {...item, completed: !item.completed} : item);
        console.log(changeTodos)
        this._offlineStorage.setToOffline(
            OFFLINE_ENTITY_TYPES.TODOS,
            changeTodos
        );

        return 
    }

    async updateTodo(todo: {editText: string, id: string}): Promise<ITodo | undefined> {
        const todos = await this._offlineStorage.getFromOffline<ITodo[]>(
            OFFLINE_ENTITY_TYPES.TODOS
        ) 

        const changeTodos = todos.map((item) => item.id === todo.id ? {...item, todo: todo.editText} : item);
        
        console.log(changeTodos)
        this._offlineStorage.setToOffline(
            OFFLINE_ENTITY_TYPES.TODOS,
            changeTodos
        );

        return 
    }

    async removeTodo(id: string): Promise<void | undefined> {
        const todos = await this._offlineStorage.getFromOffline<ITodo[]>(
            OFFLINE_ENTITY_TYPES.TODOS
        );

        const changeTodos = todos.filter((item) => item.id !== id);
        
        this._offlineStorage.setToOffline(
            OFFLINE_ENTITY_TYPES.TODOS,
            changeTodos
        );
    }

}