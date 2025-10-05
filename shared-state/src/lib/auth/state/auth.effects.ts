import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { UserService } from '@user-management-app/data-access';

@Injectable()
export class AuthEffects {
 private readonly actions$ = inject(Actions);
 private readonly userService = inject(UserService);

 login$ = createEffect(() =>
  this.actions$.pipe(
   ofType(AuthActions.login),
   switchMap(({ credentials }) =>
    this.userService.getUsers().pipe(
     map(users => {
      const user = users.find(u =>
       u.username === credentials.username &&
       credentials.password === 'password' // Mock validation
      );
      if (user) {
       return AuthActions.loginSuccess({ user });
      } else {
       return AuthActions.loginFailure({ error: 'Invalid credentials' });
      }
     }),
     catchError(error => of(AuthActions.loginFailure({ error: error.message })))
    )
   )
  )
 );
}