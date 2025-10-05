import { createReducer, on } from '@ngrx/store';
import { AuthState } from '@user-management-app/data-access';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export const authInitialState: AuthState = {
 isAuthenticated: false,
 user: null,
 error: null
};

export const authReducer = createReducer(
 authInitialState,
 on(AuthActions.login, (state) => ({
  ...state,
  error: null
 })),
 on(AuthActions.loginSuccess, (state, { user }) => ({
  ...state,
  isAuthenticated: true,
  user,
  error: null
 })),
 on(AuthActions.loginFailure, (state, { error }) => ({
  ...state,
  isAuthenticated: false,
  user: null,
  error
 })),
 on(AuthActions.logout, () => authInitialState)
);