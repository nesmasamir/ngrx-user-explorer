    import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "../services/users.service";
import { getUser, getUserFailure, getUserSuccess, getUsers, getUsersFailure, getUsersSuccess } from "./users.actions";
import { catchError, delay, map, of, switchMap } from "rxjs";
import { Iuser } from "../model/user.model";

@Injectable()
export class UsersEffects {
    constructor(private actions: Actions, private usersService: UsersService) { }


    getUsers$ = createEffect(() => this.actions
        .pipe(
            ofType(getUsers.type),
            // delay(2000),

            switchMap(({pageIndex}) => this.usersService.getUsers(pageIndex)
                .pipe(

                    map((users: Iuser[]) => ({ type: getUsersSuccess.type, users: users })),
                    catchError((err: Error) => {
                        return of(getUsersFailure({ error: err }));
                    })
                )


            )))


    getuser$ = createEffect(() => this.actions
        .pipe(
            ofType(getUser.type),
            // delay(2000),
            switchMap(( {id} ) => this.usersService.getUserById(id)
                .pipe(
                   
                    map((user) => ({ type: getUserSuccess.type, user: user })),
                    catchError((error:string) => {
                        return of(getUserFailure({error:error}))
                    })
                )
            )
        )

    )
}


// { type: getAlbumSuccess.type, payload: albums }