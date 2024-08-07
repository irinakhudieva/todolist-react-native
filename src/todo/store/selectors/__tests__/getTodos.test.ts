import { StateSchema } from "@/shared/store";
import { getTodos } from "../getTodos";


describe('getTodos.test', () => {
    test('should return array', () => {
        const state: DeepPartial<StateSchema> = {
            todo: {
                todos: [
                    {id: '1', todo: 'todo1',completed: false, isSended: true},
                    {id: '2', todo: 'todo2',completed: false, isSended: true},
                ]
            }
        }
        expect(getTodos(state as StateSchema)).toEqual([
            {id: '1', todo: 'todo1',completed: false, isSended: true},
            {id: '2', todo: 'todo2',completed: false, isSended: true},
        ]);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getTodos(state as StateSchema)).toEqual([]);
    });
});