import { StateSchema } from "@/shared/store";

export const getIsConnectedToNetwork = (state: StateSchema): boolean => state?.offline?.isOnline;