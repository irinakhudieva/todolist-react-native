import { ThunkConfig } from "@/shared/store/thunkConfig";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OfflineStorageManager } from "../../services/offline.storage.manager";
import { OFFLINE_ENTITY_TYPES } from "../../entities/offline-entity";
import { ITodo } from "@/todo/store/reducers/todo.reducer";


export interface OfflineState {
    isOnline: boolean;
    offlineItems: ITodo[];
    isLoading: boolean;
}

export const offlineInitialState: OfflineState = {
    isOnline: false,
    offlineItems: [],
    isLoading: false
}

export const offlineSlice = createSlice({
    name: 'offline',
    initialState: offlineInitialState,
    reducers: {
        setIsOnline(state, action: PayloadAction<boolean>) {
            state.isOnline = action.payload;
        },
        setOfflineItems(state, action: PayloadAction<ITodo[]>) {
            state.offlineItems = action.payload;
        }
    },
});

export const loadUnsavedItems = createAsyncThunk<void, void, ThunkConfig<string>>(
  'loadUnsavedItems',
  async (_, { dispatch, extra }) => {
    const unsavedItemsManager = extra.container.get<OfflineStorageManager>(OfflineStorageManager)
    const items = await unsavedItemsManager.getFromOffline<ITodo[]>(
      OFFLINE_ENTITY_TYPES.TODOS
    )

    dispatch(setOfflineItems(items ?? []));
  },
);


export const {
    setIsOnline,
    setOfflineItems
} = offlineSlice.actions;
  
export default offlineSlice.reducer;

