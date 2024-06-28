import { Container } from "inversify";
import { StateSchema } from ".";

export interface ThunkExtraArg {
    container: Container;
}
 
 export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

