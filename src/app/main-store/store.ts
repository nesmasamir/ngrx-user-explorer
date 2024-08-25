import { ActionReducerMap } from "@ngrx/store";
import { IUsersState, usersReducer } from "./users.reducers";
import { UsersEffects } from "./users.effects";


export interface IAppState {
    usersData: IUsersState;

}


export const appReducers: ActionReducerMap<IAppState> = { usersData: usersReducer };
export const appEffects=[UsersEffects]; 