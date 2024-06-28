import offlineReducer, { 
    OfflineState, 
    setIsOnline, 
    setOfflineItems 
} from "../offline.reducer";


describe('offline.slice.test', () => {
    const unsavedItems =  [
        {
            id: '1',
            todo: 'todo1',
            completed: false,
            isSended: true
        }
    ];

    test('test set is online', () => {
        const state: DeepPartial<OfflineState> = {
            isOnline: true
        }

        expect(offlineReducer(
            state as OfflineState, 
            setIsOnline(false)
        )).toEqual({ isOnline: false });
    });

    test('test set unsaved items', () => {
        const state: DeepPartial<OfflineState> = { 
            offlineItems: []
        };

        expect(offlineReducer(
            state as OfflineState, 
            setOfflineItems(unsavedItems)
        )).toEqual({ offlineItems: [...unsavedItems] })
    });

});
