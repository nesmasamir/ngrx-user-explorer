import { createReducer, on } from "@ngrx/store";
import { Iuser } from "../model/user.model";
import { getUser, getUserSuccess, getUsers, getUsersSuccess } from "./users.actions";

export interface IUsersState {
    per_page: number,
    total: number,
    total_pages: number,
    page:number
    data: Iuser[],
    loading: boolean,
    error: string,
    singleUser: Iuser | null
}

export const initialState: IUsersState = {
    per_page: 0,
    total: 0,
    total_pages: 0,
    page:1,
    data: [],
    loading: false,
    error: '',
    singleUser: null

}

export const usersReducer = createReducer<IUsersState>(initialState,
    on(getUsers, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(getUsersSuccess, (state, { users }) => {
       
        return {
            ...state,
            loading: false,
            ...users

            // data:users
        }
    }),
    on(getUser, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(getUserSuccess, (state, user) => {
        // console.log(user)

        return {
            
            ...state,
            singleUser:user["user"]["data"],
            loading:false

        }
    })


)