import { getIsConnectedToNetwork } from "@/offline/store/selectors/getIsConnectedToNetwork";
import { rootReducer, store } from "..";

export type RootState = ReturnType<typeof rootReducer>;
export const getRootState = (): RootState => <RootState><unknown>store.getState()

export const getStatus = ()=> {
    return getIsConnectedToNetwork(getRootState())
} 