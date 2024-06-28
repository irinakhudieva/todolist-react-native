import { OfflineStorageManager } from "@/offline/services/offline.storage.manager";
import TodoOfflineService from "../todoOfflineService";
import { ITodo } from "@/todo/store/reducers/todo.reducer";
import { OFFLINE_ENTITY_TYPES } from "@/offline/entities/offline-entity";

describe('TodoOfflineService.test', () => {
    let service: TodoOfflineService;
    let mockOfflineStorageManager: jest.Mocked<OfflineStorageManager>;

    beforeEach(() => {
        mockOfflineStorageManager = {
            getFromOffline: jest.fn(),
            setToOffline: jest.fn(),
        } as jest.Mocked<OfflineStorageManager>;

        service = new TodoOfflineService();
        service['_offlineStorage'] = mockOfflineStorageManager;
    });

    test('should fetch all todos', async () => {
        const mockTodos: ITodo[] = [
            { id: '1', todo: 'todo1', completed: false, isSended: false }
        ];

        mockOfflineStorageManager.getFromOffline.mockResolvedValue(mockTodos);

        const result = await service.fetchAllTodo();

        expect(result).toEqual(mockTodos);
        expect(mockOfflineStorageManager.getFromOffline).toHaveBeenCalledWith(OFFLINE_ENTITY_TYPES.TODOS);
    });

    test('should create a new todo', async () => {
        const newTodoData = { todo: 'New Todo', completed: false };
        const mockTodos: ITodo[] = [];

        mockOfflineStorageManager.getFromOffline.mockResolvedValue(mockTodos);
        mockOfflineStorageManager.setToOffline.mockResolvedValue();

        const result = await service.createTodo(newTodoData);

        expect(result).toEqual(expect.objectContaining({
            id: expect.any(String),
            todo: newTodoData.todo,
            completed: newTodoData.completed,
            isSended: false,
        }));
        expect(mockOfflineStorageManager.setToOffline).toHaveBeenCalledWith(
            OFFLINE_ENTITY_TYPES.TODOS,
            expect.arrayContaining([expect.objectContaining({ todo: newTodoData.todo })])
        );
    });

    test('should toggle the completion status of a todo', async () => {
        const mockTodos: ITodo[] = [
            { id: '1', todo: 'todo1', completed: false, isSended: false }
        ];

        mockOfflineStorageManager.getFromOffline.mockResolvedValue(mockTodos);
        mockOfflineStorageManager.setToOffline.mockResolvedValue();

        await service.toggleCompleted('1');

        expect(mockOfflineStorageManager.setToOffline).toHaveBeenCalledWith(
            OFFLINE_ENTITY_TYPES.TODOS,
            expect.arrayContaining([expect.objectContaining({ id: '1', completed: true })])
        );
    });

    test('should update a todo', async () => {
        const mockTodos: ITodo[] = [
            { id: '1', todo: 'todo1', completed: false, isSended: false }
        ];

        mockOfflineStorageManager.getFromOffline.mockResolvedValue(mockTodos);
        mockOfflineStorageManager.setToOffline.mockResolvedValue();

        const updatedTodoData = { editText: 'Updated Todo', id: '1' };

        await service.updateTodo(updatedTodoData);

        expect(mockOfflineStorageManager.setToOffline).toHaveBeenCalledWith(
            OFFLINE_ENTITY_TYPES.TODOS,
            expect.arrayContaining([expect.objectContaining({ id: '1', todo: 'Updated Todo' })])
        );
    });

    test('should remove a todo', async () => {
        const mockTodos: ITodo[] = [
            { id: '1', todo: 'todo1', completed: false, isSended: false }
        ];

        mockOfflineStorageManager.getFromOffline.mockResolvedValue(mockTodos);
        mockOfflineStorageManager.setToOffline.mockResolvedValue();

        await service.removeTodo('1');

        expect(mockOfflineStorageManager.setToOffline).toHaveBeenCalledWith(
            OFFLINE_ENTITY_TYPES.TODOS,
            []
        );
    });
});