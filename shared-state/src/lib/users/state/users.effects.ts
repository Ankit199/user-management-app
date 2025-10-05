import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import { UserService } from '@user-management-app/data-access';

@Injectable()
export class UsersEffects {
 private readonly actions$ = inject(Actions);
 private readonly userService = inject(UserService);

 loadUsers$ = createEffect(() =>
  this.actions$.pipe(
   ofType(UsersActions.loadUsers),
   switchMap(() =>
    this.userService.getUsers().pipe(
     map(users => UsersActions.loadUsersSuccess({ users })),
     catchError(error => of(UsersActions.loadUsersFailure({ error: error.message })))
    )
   )
  )
 );

 addUser$ = createEffect(() =>
  this.actions$.pipe(
   ofType(UsersActions.addUser),
   switchMap(({ user }) =>
    this.userService.createUser(user).pipe(
     map(newUser => UsersActions.addUserSuccess({ user: newUser })),
     catchError(error => of(UsersActions.addUserFailure({ error: error.message })))
    )
   )
  )
 );

 updateUser$ = createEffect(() =>
  this.actions$.pipe(
   ofType(UsersActions.updateUser),
   switchMap(({ user }) =>
    this.userService.updateUser(user.id, user).pipe(
     map(updatedUser => UsersActions.updateUserSuccess({ user: updatedUser })),
     catchError(error => of(UsersActions.updateUserFailure({ error: error.message })))
    )
   )
  )
 );

 deleteUser$ = createEffect(() =>
  this.actions$.pipe(
   ofType(UsersActions.deleteUser),
   switchMap(({ id }) =>
    this.userService.deleteUser(id).pipe(
     map(() => UsersActions.deleteUserSuccess({ id })),
     catchError(error => of(UsersActions.deleteUserFailure({ error: error.message })))
    )
   )
  )
 );
}