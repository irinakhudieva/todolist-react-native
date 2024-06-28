import "reflect-metadata";
import BaseApiService from "@/shared/axios/base.api";
import ITodoService from "./ITodoService";
import { TodoResponse } from "./response/todo.response";
import { injectable } from "inversify";
import { ITodo } from "../store/reducers/todo.reducer";
import { OFFLINE_ENTITY_TYPES } from "@/offline/entities/offline-entity";


@injectable()
export default class TodoOnlineService extends BaseApiService implements ITodoService {

    async fetchAllTodo(): Promise<TodoResponse | undefined> {
        const response = await this.api.get<TodoResponse>('/todos');

        this._offlineStorage.setToOffline(
            OFFLINE_ENTITY_TYPES.TODOS, 
            response.data
        );

        return response.data || undefined;
    }

    async createTodo(todo: {todo: string, completed: boolean}): Promise<ITodo | undefined> {
        const response = await this.api.post<ITodo>(`/todos`, {
            ...todo, 
            isSended: true
        });

        const todos = await this._offlineStorage.getFromOffline<ITodo[]>(
            OFFLINE_ENTITY_TYPES.TODOS
        )

        todos.push(response.data);

        await this._offlineStorage.setToOffline(
            OFFLINE_ENTITY_TYPES.TODOS,
            todos
        )

        return response.data || undefined;
    }
    
    async toggleCompleted(id: string, completed: boolean): Promise<ITodo | undefined> {
        const response = await this.api.put(`/todos/${id}`, {
            completed: !completed
        });

        const todos = await this._offlineStorage.getFromOffline<ITodo[]>(
            OFFLINE_ENTITY_TYPES.TODOS
        );

        const changeTodos = todos.map((item) => item.id === id ? {...item, completed: !item.completed} : item);
        
        this._offlineStorage.setToOffline(
            OFFLINE_ENTITY_TYPES.TODOS,
            changeTodos
        );

        return response.data || undefined;
    }

    async updateTodo(todo: {editText: string, id: string}): Promise<ITodo | undefined> {
        const response = await this.api.put(`/todos/${todo.id}`, {
            todo: todo.editText
        });

        const todos = await this._offlineStorage.getFromOffline<ITodo[]>(
            OFFLINE_ENTITY_TYPES.TODOS
        ) 

        const changeTodos = todos.map((item) => item.id === todo.id ? {...item, todo: todo.editText} : item);
        
        this._offlineStorage.setToOffline(
            OFFLINE_ENTITY_TYPES.TODOS,
            changeTodos
        );

        return response.data || undefined;
    }

    async removeTodo(id: string): Promise<void | undefined> {
        await this.api.delete(`/todos/${id}`);

        const todos = await this._offlineStorage.getFromOffline<ITodo[]>(
            OFFLINE_ENTITY_TYPES.TODOS
        );

        const changeTodos = todos.filter((item) => item.id !== id);
        
        this._offlineStorage.setToOffline(
            OFFLINE_ENTITY_TYPES.TODOS,
            changeTodos
        );

    }

    async syncTodo(id: string): Promise<ITodo | undefined> {
        const todos = await this._offlineStorage.getFromOffline<ITodo[]>(
            OFFLINE_ENTITY_TYPES.TODOS
        );
        
        const todo = todos.find(item => item.id === id)

        const { data } = await this.api.post<ITodo>(`/todos`, {...todo, isSended: true})
      
        if(data) {
            const updatedTodos = todos.filter(item => item.id !== id);
            updatedTodos.push(data);
        
            await this._offlineStorage.setToOffline(
              OFFLINE_ENTITY_TYPES.TODOS,
              updatedTodos
            );
        }
        
        return data;
    }
}