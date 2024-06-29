import { StateSchema } from "@/shared/store";

export const getIsOfflineLoader = (state: StateSchema): boolean => state?.offline?.isOfflineLoading;