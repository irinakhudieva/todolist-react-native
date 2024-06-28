
import { ReducersMapObject, combineReducers, configureStore } from '@reduxjs/toolkit';
import { container } from '../DI';

import todoReducer, { TodosState } from '@/todo/store/reducers/todo.reducer';
import offlineReducer, { OfflineState } from '@/offline/store/reducers/offline.reducer';

export interface StateSchema {
  todo: TodosState;
  offline: OfflineState;
}

export const rootReducer = combineReducers<ReducersMapObject<StateSchema>>({
    todo: todoReducer,
    offline: offlineReducer
});


export const setupStore = (preloadedState?: Partial<RootState>) => {

  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {container},
        },
      })
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

