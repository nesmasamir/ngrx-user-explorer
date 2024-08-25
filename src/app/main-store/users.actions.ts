import { createAction, props } from "@ngrx/store";
import { Iuser } from "../model/user.model";

const prefix = '[Users]'
export const getUsers = createAction(`${prefix} Get Users`,props<{pageIndex:number}>());
export const getUsersSuccess = createAction(`${getUsers.type} Success`, props<{ users: Iuser[] }>());
export const getUsersFailure = createAction(`${getUsers.type} Failed`, props<{ error: Error }>());


export const getUser = createAction('get user', props<{ id: number }>());
export const getUserSuccess = createAction(`${getUser.type} Success`, props<{ user: { data: Iuser, support: any } }>());
export const getUserFailure = createAction(`${getUser.type} Failed`, props<{ error: string }>());