import { StateSchema } from "@/shared/store";
import { getTodos } from "../getTodos";


describe('getTodos.test', () => {
    test('should return array', () => {
        const state: DeepPartial<StateSchema> = {
            todo: {
                todos: []
            }
        }
        expect(getTodos(state as StateSchema)).toEqual([]);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getTodos(state as StateSchema)).toEqual([]);
    });
});