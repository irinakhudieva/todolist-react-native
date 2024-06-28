import "reflect-metadata";
import { Container } from "inversify";
import OfflineOnlineContainer from "./offline-online";
import BaseApiService from "../axios/base.api";
import ITodoService from "@/todo/services/ITodoService";
import { TYPES } from "./types";
import TodoOnlineService from "@/todo/services/todoOnlineService";
import TodoOfflineService from "@/todo/services/todoOfflineService";
import { IOfflineStorageManager, OfflineStorageManager } from "@/offline/services/offline.storage.manager";
import NetworkConnectionStatus from "@/offline/services/network.connection.status";

const container = new Container();

const internetConnectionChecker = new NetworkConnectionStatus();
const offlineOnlineBind = new OfflineOnlineContainer(
    container,
    internetConnectionChecker
);

container.bind<BaseApiService>(BaseApiService).toSelf();

offlineOnlineBind
  .setImplFor<ITodoService>(TYPES.ITodo)
  .toImpls(TodoOnlineService, TodoOfflineService);

container
  .bind<IOfflineStorageManager>(OfflineStorageManager)
  .toSelf()

export { container };