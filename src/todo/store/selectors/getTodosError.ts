import { StateSchema } from "@/shared/store";

export const getTodosError = (state: StateSchema) => state?.todo?.error;