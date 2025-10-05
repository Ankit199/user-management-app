import { createAction, props } from '@ngrx/store';
import { LoginCredentials, User } from '@user-management-app/data-access';

export const login = createAction(
 '[Auth] Login',
 props<{ credentials: LoginCredentials }>()
);

export const loginSuccess = createAction(
 '[Auth] Login Success',
 props<{ user: User }>()
);

export const loginFailure = createAction(
 '[Auth] Login Failure',
 props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');