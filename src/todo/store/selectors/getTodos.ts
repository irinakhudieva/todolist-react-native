import { StateSchema } from "@/shared/store";

export const getTodos = (state: StateSchema) => state?.todo?.todos || [];