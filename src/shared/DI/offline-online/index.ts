import { Container, interfaces } from 'inversify';
import Newable = interfaces.Newable;
import IConnectionChecker from '@/shared/DI/offline-online/types';

export default class OfflineOnlineContainer {
    private readonly container: Container;
    private readonly connectionChecker: IConnectionChecker;

    constructor(container: Container, isOnlineService: IConnectionChecker) {
        this.container = container;
        this.connectionChecker = isOnlineService;
    }
    

    public setImplFor<T>(name: string | symbol | interfaces.ServiceIdentifier<T>) {
        return new OfflineOnlineBindingImpl<T>(
            this.container.bind<T>(name),
            this.connectionChecker,
            this.container
        );
    }
}

export class OfflineOnlineBindingImpl<T> {
    private offlineOnlineBinding: interfaces.BindingToSyntax<T>;
    private container: Container;
    private connectionChecker: IConnectionChecker;

    constructor(
        bind: interfaces.BindingToSyntax<T>,
        connectionChecker: IConnectionChecker,
        container: Container
    ) {
        this.offlineOnlineBinding = bind;
        this.connectionChecker = connectionChecker;
        this.container = container;
    }

    public toImpls<Online extends Newable<T>, Offline extends Newable<T>>(
        online: Online,
        offline: Offline,
    ) {

        this.container.bind(online).toSelf()
        this.container.bind(offline).toSelf()

        return this.offlineOnlineBinding
            .toDynamicValue(() => {
                if (this.connectionChecker.isOnline()) {
                    return this.container.get(online)
                }

                return this.container.get(offline);
            })
            .inRequestScope();
        }
}