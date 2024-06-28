import IConnectionChecker from "@/shared/DI/offline-online/types";
import { injectable } from "inversify";
import { getStatus } from "@/shared/store/state";

@injectable()
export default class NetworkConnectionStatus implements IConnectionChecker {
   isOnline(): boolean {
        return getStatus();
    }
}