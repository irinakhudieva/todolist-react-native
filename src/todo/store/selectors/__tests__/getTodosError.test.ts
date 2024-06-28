import { StateSchema } from "@/shared/store";
import { getTodosError } from "../getTodosError";


describe('getTodosError.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            todo: {
                error: 'error'
            }
        }
        expect(getTodosError(state as StateSchema)).toEqual('error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getTodosError(state as StateSchema)).toEqual(undefined);
    });
});