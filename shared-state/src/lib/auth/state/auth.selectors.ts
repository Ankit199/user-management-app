import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '@user-management-app/data-access';
import { authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsAuthenticated = createSelector(
 selectAuthState,
 (state: AuthState) => state.isAuthenticated
);

export const selectCurrentUser = createSelector(
 selectAuthState,
 (state: AuthState) => state.user
);

export const selectAuthError = createSelector(
 selectAuthState,
 (state: AuthState) => state.error
);