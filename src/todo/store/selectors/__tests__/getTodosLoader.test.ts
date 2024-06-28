import { StateSchema } from "@/shared/store";
import { getTodosLoader } from "../getTodosLoader";


describe('getTodosLoader.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            todo: {
                isLoading: true
            }
        }
        expect(getTodosLoader(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getTodosLoader(state as StateSchema)).toEqual(false);
    });
});