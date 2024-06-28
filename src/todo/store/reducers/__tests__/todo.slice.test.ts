import todoReducer, { ITodo, TodosState, setChangeCompleted, setCreateTodo, setDeleteTodo, setFilter, setTodos, setUpdateTodo } from "../todo.reducer";


describe('todo.slice.test', () => {
    const todos =  [
        {
            id: '1',
            todo: 'todo1',
            completed: false,
            isSended: true
        }
    ];

    const newTodo = {
        id: '2',
        todo: 'todo2',
        completed: false,
        isSended: true
    };

    test('test set todos', () => {
        const state: DeepPartial<TodosState> = {
            todos: []
        }

        expect(todoReducer(
            state as TodosState, 
            setTodos(todos)
        )).toEqual({ todos: [...todos]});
    });

    test('test set create todo', () => {
        const state: DeepPartial<TodosState> = { 
            todos: []
        };

        expect(todoReducer(
            state as TodosState, 
            setCreateTodo(newTodo)
        )).toEqual({ todos: [newTodo] })
    });

    test('test set filter', () => {
        const state: DeepPartial<TodosState> = { 
            filter: 'unsaved'
        };

        expect(todoReducer(
            state as TodosState, 
            setFilter('unsaved')
        )).toEqual({ filter: 'unsaved' })
    });

    test('test set change completed', () => {
        const state: DeepPartial<TodosState> = { 
            todos: [...todos]
        };

        expect(todoReducer(
            state as TodosState, 
            setChangeCompleted('1')
        )).toEqual({ todos: [
            {
                id: '1',
                todo: 'todo1',
                completed: true,
                isSended: true
            }
        ]})
    });

    test('test set update todo', () => {
        const state: DeepPartial<TodosState> = { 
            todos: [...todos]
        };

        expect(todoReducer(
            state as TodosState, 
            setUpdateTodo({id: '1', editText: 'todo123'})
        )).toEqual({ todos: [
            {
                id: '1',
                todo: 'todo123',
                completed: false,
                isSended: true
            }
        ]})
    });

    test('test delete todo', () => {
        const state: DeepPartial<TodosState> = { 
            todos: [...todos]
        };

        expect(todoReducer(
            state as TodosState, 
            setDeleteTodo('1')
        )).toEqual({ todos: []})
    });
});
