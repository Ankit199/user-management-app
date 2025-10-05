import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersFeatureKey, UsersState, usersAdapter } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>(usersFeatureKey);

const {
 selectAll,
 selectEntities,
 selectIds,
 selectTotal
} = usersAdapter.getSelectors();

export const selectAllUsers = createSelector(selectUsersState, selectAll);
export const selectUserEntities = createSelector(selectUsersState, selectEntities);
export const selectUserIds = createSelector(selectUsersState, selectIds);
export const selectTotalUsers = createSelector(selectUsersState, selectTotal);

export const selectUsersLoading = createSelector(
 selectUsersState,
 (state: UsersState) => state.loading
);

export const selectUsersError = createSelector(
 selectUsersState,
 (state: UsersState) => state.error
);

export const selectUserById = (id: number) =>
 createSelector(selectUserEntities, (entities) => entities[id]);