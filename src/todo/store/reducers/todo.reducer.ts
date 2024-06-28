import { TYPES } from '@/shared/DI/types';
import { ThunkConfig } from '@/shared/store/thunkConfig';
import ITodoService from '@/todo/services/ITodoService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ITodo {
    id: string;
    todo: string;
    completed: boolean;
    isSended: boolean;
}


export type FilterTodo = 'all' | 'unsaved';

export interface TodosState {
    todos: ITodo[];
    filter: FilterTodo;
    isLoading: boolean;
    error: string | null;
}

const initialState: TodosState = {
    todos: [],
    filter: 'all',
    isLoading: false,
    error: undefined 
}


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<ITodo[]>) => {
            state.todos = action.payload;
        },
        setCreateTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos = [...state.todos, action.payload];
        },
        setFilter: (state, action: PayloadAction<FilterTodo>) => {
            state.filter = action.payload;
        },
        setChangeCompleted: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.map((item: ITodo) => item.id === action.payload ? {...item, completed: !item.completed} : item)
        },
        setUpdateTodo: (state, action: PayloadAction<{id: string, editText: string}>) => {
            state.todos = state.todos.map((item: ITodo) => item.id === action.payload.id ? {...item, todo: action.payload.editText} : item)
        },
        setDeleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((item: ITodo) => item.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTodos.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAllTodos.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchAllTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(syncTodoToServer.fulfilled, (state, action) => {
                state.todos = state.todos.filter(item => item.id !== action.payload)
            })
    },
});

export const fetchAllTodos = createAsyncThunk<void, void, ThunkConfig<string>>(
    'fetchAllTodos',
    async (_, { dispatch, rejectWithValue, extra }) => {
        try {
            const service: ITodoService = extra.container.get<ITodoService>(TYPES.ITodo);
            const data = await service.fetchAllTodo();

            if(data) {
                dispatch(setTodos(data));
            }

        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
      
    },
)

export const createTodo = createAsyncThunk<void, {todo: string, completed: boolean}, ThunkConfig<string>>(
    'createTodo',
    async (todo: {todo: string, completed: boolean}, { dispatch, rejectWithValue, extra }) => {
        try {
            const service: ITodoService = extra.container.get<ITodoService>(TYPES.ITodo);

            const data = await service.createTodo(todo);
            
            dispatch(setCreateTodo(data));

        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
    
)


export const toggleCompleted = createAsyncThunk<void, {id: string, completed: boolean}, ThunkConfig<string>>(
    'toggleCompleted',
    async (todoData: {id: string, completed: boolean}, { dispatch, rejectWithValue, extra }) => {
        try {
            const service: ITodoService = extra.container.get<ITodoService>(TYPES.ITodo);
            await service.toggleCompleted(todoData.id, todoData.completed);
            dispatch(setChangeCompleted(todoData.id));
        } catch (error) {
            console.log(error)
            return rejectWithValue('error');
        }
    },
)

export const updateTodo = createAsyncThunk<void, Record<string, string>, ThunkConfig<string>>(
    'updateTodo',
    async (todoData: { id: string, editText: string }, { dispatch, rejectWithValue, extra }) => {
        try {
            const service: ITodoService = extra.container.get<ITodoService>(TYPES.ITodo);
            await service.updateTodo(todoData);
            dispatch(setUpdateTodo(todoData));
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
)

export const removeTodo = createAsyncThunk<void, string, ThunkConfig<string>>(
    'removeTodo',
    async (id: string, { dispatch, rejectWithValue, extra }) => {
        try {
            const service: ITodoService = extra.container.get<ITodoService>(TYPES.ITodo);
            await service.removeTodo(id);
            dispatch(setDeleteTodo(id));
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
)


export const syncTodoToServer = createAsyncThunk<string, string, ThunkConfig<string>>(
    'syncTodoToServer',
    async (id: string, { dispatch, rejectWithValue, extra }) => {
        try {
            const service: ITodoService = extra.container.get<ITodoService>(TYPES.ITodo);
            const data = await service.syncTodo(id);

            if(data) {
                dispatch(setCreateTodo(data));
            }

            return id;
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
)

export const { 
    setTodos, 
    setCreateTodo, 
    setChangeCompleted, 
    setDeleteTodo, 
    setUpdateTodo,
    setFilter 
} = todoSlice.actions;

export default todoSlice.reducer;