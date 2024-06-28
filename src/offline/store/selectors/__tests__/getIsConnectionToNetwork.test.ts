import { StateSchema } from "@/shared/store";
import { getIsConnectedToNetwork } from "../getIsConnectedToNetwork";


describe('getIsConnectedToNetwork.test', () => {
    test('should return isOnline true', () => {
        const state: DeepPartial<StateSchema> = {
            offline: {
                isOnline: true
            }
        }
        expect(getIsConnectedToNetwork(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getIsConnectedToNetwork(state as StateSchema)).toEqual(undefined);
    });
});