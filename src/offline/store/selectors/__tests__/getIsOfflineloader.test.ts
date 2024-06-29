import { StateSchema } from "@/shared/store";
import { getIsOfflineLoader } from "../getIsOfflineLoader";


describe('getIsOfflineLoader.test', () => {
    test('should return isOfflineLoading false', () => {
        const state: DeepPartial<StateSchema> = {
            offline: {
                isOfflineLoading: false
            }
        }
        expect(getIsOfflineLoader(state as StateSchema)).toEqual(false);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getIsOfflineLoader(state as StateSchema)).toEqual(undefined);
    });
});