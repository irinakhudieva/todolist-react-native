import { OfflineStorageManager } from "@/offline/services/offline.storage.manager";
import TodoOnlineService from "../todoOnlineService";
import { OFFLINE_ENTITY_TYPES } from "@/offline/entities/offline-entity";
import { TodoResponse } from "../response/todo.response";
import { ITodo } from "@/todo/store/reducers/todo.reducer";

const mockApi = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
};
  
const mockOfflineStorage = {
    setToOffline: jest.fn(),
    getFromOffline: jest.fn(),
};

describe('TodoOnlineService.test', () => {
    let service: TodoOnlineService;
    let mockOfflineStorageManager: jest.Mocked<OfflineStorageManager>;
       
    beforeEach(() => {
        mockOfflineStorageManager = mockOfflineStorage as jest.Mocked<OfflineStorageManager>;
    
        service = new TodoOnlineService(mockApi as any);
        service['_offlineStorage'] = mockOfflineStorageManager;
    });

    test('fetchAllTodo should fetch todos and save them to offline storage', async () => {
        const todosResponse: TodoResponse = [{ id: '1', todo: 'Test Todo', completed: false, isSended: true }];
    
        mockApi.get.mockResolvedValueOnce({ data: todosResponse });
    
        const result = await service.fetchAllTodo();
    
        expect(mockApi.get).toHaveBeenCalledWith('/todos');
        expect(mockOfflineStorage.setToOffline).toHaveBeenCalledWith(
          OFFLINE_ENTITY_TYPES.TODOS,
          todosResponse
        );
        expect(result).toEqual(todosResponse);
    });

    test('createTodo should create a todo and update offline storage', async () => {
        const newTodo: ITodo = { id: '1', todo: 'New Todo', completed: false, isSended: true };
        
        mockApi.post.mockResolvedValueOnce({ data: newTodo });

        mockOfflineStorage.getFromOffline.mockResolvedValueOnce([]);
    
        const result = await service.createTodo({ todo: 'New Todo', completed: false });
    
        expect(mockApi.post).toHaveBeenCalledWith('/todos', { todo: 'New Todo', completed: false, isSended: true });
        expect(mockOfflineStorage.setToOffline).toHaveBeenCalledWith(
          OFFLINE_ENTITY_TYPES.TODOS,
          [newTodo]
        );
        expect(result).toEqual(newTodo);
    });
    
    test('toggleCompleted should toggle completed status and update offline storage', async () => {
        const initialTodos: ITodo[] = [
          { id: '1', todo: 'Test Todo', completed: false, isSended: true }
        ];
    
        const updatedTodo: ITodo = { id: '1', todo: 'Test Todo', completed: true, isSended: true };
    
        mockApi.put.mockResolvedValueOnce({ data: updatedTodo });
        mockOfflineStorage.getFromOffline.mockResolvedValueOnce(initialTodos);
    
        const result = await service.toggleCompleted('1', false);
    
        expect(mockApi.put).toHaveBeenCalledWith('/todos/1', { completed: true });
        expect(mockOfflineStorage.setToOffline).toHaveBeenCalledWith(
          OFFLINE_ENTITY_TYPES.TODOS,
          [updatedTodo]
        );
        expect(result).toEqual(updatedTodo);
    });

    test('updateTodo should update a todo and update offline storage', async () => {
        const initialTodos: ITodo[] = [
          { id: '1', todo: 'Old Text', completed: false, isSended: true }
        ];
    
        const updatedTodo: ITodo = { id: '1', todo: 'New Text', completed: false, isSended: true };
    
        mockApi.put.mockResolvedValueOnce({ data: updatedTodo });
        mockOfflineStorage.getFromOffline.mockResolvedValueOnce(initialTodos);
    
        const result = await service.updateTodo({ id: '1', editText: 'New Text' });
    
        expect(mockApi.put).toHaveBeenCalledWith('/todos/1', { todo: 'New Text' });
        expect(mockOfflineStorage.setToOffline).toHaveBeenCalledWith(
          OFFLINE_ENTITY_TYPES.TODOS,
          [updatedTodo]
        );
        expect(result).toEqual(updatedTodo);
    });

    test('removeTodo should delete a todo and update offline storage', async () => {
        const initialTodos: ITodo[] = [
          { id: '1', todo: 'Test Todo', completed: false, isSended: true }
        ];
    
        mockApi.delete.mockResolvedValueOnce({});
        mockOfflineStorage.getFromOffline.mockResolvedValueOnce(initialTodos);
    
        await service.removeTodo('1');
    
        expect(mockApi.delete).toHaveBeenCalledWith('/todos/1');
        expect(mockOfflineStorage.setToOffline).toHaveBeenCalledWith(
          OFFLINE_ENTITY_TYPES.TODOS,
          []
        );
    });

    test('syncTodo should sync a todo with the server and update offline storage', async () => {
        const initialTodos: ITodo[] = [
          { id: '1', todo: 'Test Todo', completed: false, isSended: false }
        ];
    
        const syncedTodo: ITodo = { id: '1', todo: 'Test Todo', completed: false, isSended: true };
    
        mockOfflineStorage.getFromOffline.mockResolvedValueOnce(initialTodos);
        mockApi.post.mockResolvedValueOnce({ data: syncedTodo });
    
        const result = await service.syncTodo('1');
    
        expect(mockApi.post).toHaveBeenCalledWith('/todos', { ...initialTodos[0], isSended: true });
        expect(mockOfflineStorage.setToOffline).toHaveBeenCalledWith(
          OFFLINE_ENTITY_TYPES.TODOS,
          [syncedTodo]
        );
        expect(result).toEqual(syncedTodo);
    });

});

    
        