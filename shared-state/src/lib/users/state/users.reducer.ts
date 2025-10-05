import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '@user-management-app/data-access';
import * as UsersActions from './users.actions';

export const usersFeatureKey = 'users';

export interface UsersState extends EntityState<User> {
 loading: boolean;
 error: string | null;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const usersInitialState: UsersState = usersAdapter.getInitialState({
 loading: false,
 error: null
});

export const usersReducer = createReducer(
 usersInitialState,
 on(UsersActions.loadUsers, (state) => ({
  ...state,
  loading: true,
  error: null
 })),
 on(UsersActions.loadUsersSuccess, (state, { users }) =>
  usersAdapter.setAll(users, { ...state, loading: false })
 ),
 on(UsersActions.loadUsersFailure, (state, { error }) =>
  usersAdapter.setAll([], { ...state, loading: false, error })
 ),
 on(UsersActions.addUserSuccess, (state, { user }) =>
  usersAdapter.addOne(user, state)
 ),
 on(UsersActions.updateUserSuccess, (state, { user }) =>
  usersAdapter.updateOne({ id: user.id, changes: user }, state)
 ),
 on(UsersActions.deleteUserSuccess, (state, { id }) =>
  usersAdapter.removeOne(id, state)
 )
);

export const { selectAll, selectEntities, selectIds, selectTotal } = usersAdapter.getSelectors();