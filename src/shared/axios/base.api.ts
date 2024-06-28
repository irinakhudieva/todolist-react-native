import "reflect-metadata";
import { inject, injectable } from "inversify";
import {AxiosInstance} from 'axios';
import { todoApi } from './axios';
import { IOfflineStorageManager, OfflineStorageManager } from "@/offline/services/offline.storage.manager";

@injectable()
export default class BaseApiService {

  @inject(OfflineStorageManager)
  protected _offlineStorage: IOfflineStorageManager;

  protected api: AxiosInstance;

  constructor(axiosInstance: AxiosInstance = todoApi) {
    this.api = axiosInstance;
  }
}