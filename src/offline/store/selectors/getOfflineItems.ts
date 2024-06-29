import { StateSchema } from "@/shared/store";

export const getOfflineItems = (state: StateSchema) => state?.offline?.offlineItems || [];