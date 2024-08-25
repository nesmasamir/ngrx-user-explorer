import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "./store";
import { IUsersState } from "./users.reducers";

export const selectUsers = createFeatureSelector<IUsersState>('usersData')



export const selectAllUsers = createSelector(selectUsers, (state: IUsersState) => state.data);
export const selectTotalPages = createSelector(selectUsers, (state: IUsersState) => state.total_pages);
export const selectCurrentPage = createSelector(selectUsers, (state: IUsersState) => state.page);

