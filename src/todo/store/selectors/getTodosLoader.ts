import { StateSchema } from "@/shared/store";

export const getTodosLoader = (state: StateSchema) => state?.todo?.isLoading || false;