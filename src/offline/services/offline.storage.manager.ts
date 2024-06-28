import 'reflect-metadata';
import {injectable} from 'inversify';
import AsyncStorage from '@react-native-async-storage/async-storage';


export declare interface IOfflineStorageManager {
    setToOffline(key: string, data: unknown): Promise<void>;
    getFromOffline<T>(key: string): Promise<T | null>;
}

@injectable()
export class OfflineStorageManager implements IOfflineStorageManager {
    async setToOffline(
        key: string,
        data: unknown
    ): Promise<void> {
        await AsyncStorage.setItem(key, JSON.stringify(data))
    }

    async getFromOffline<T>(key: string): Promise<T | null> {
        const storedValue = await AsyncStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : [];
    }

}