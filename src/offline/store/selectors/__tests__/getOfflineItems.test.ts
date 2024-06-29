import { StateSchema } from "@/shared/store";
import { getOfflineItems } from "../getOfflineItems";


describe('getOfflineItems.test', () => {
    test('should return array', () => {
        const state: DeepPartial<StateSchema> = {
            offline: {
                offlineItems: [
                    {id: '1', todo: 'todo1',completed: false, isSended: true},
                    {id: '2', todo: 'todo2',completed: false, isSended: true},
                ]
            }
        }
        expect(getOfflineItems(state as StateSchema)).toEqual([
            {id: '1', todo: 'todo1',completed: false, isSended: true},
            {id: '2', todo: 'todo2',completed: false, isSended: true},
        ]);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getOfflineItems(state as StateSchema)).toEqual([]);
    });
});