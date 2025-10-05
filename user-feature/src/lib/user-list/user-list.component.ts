import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { User } from '@user-management-app/data-access';
import { loadUsers, deleteUser } from '@user-management-app/shared-state';
import {
  selectAllUsers,
  selectUsersLoading,
} from '@user-management-app/shared-state';

@Component({
  selector: 'lib-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private readonly store = inject(Store);

  readonly users$: Observable<User[]> = this.store
    .select(selectAllUsers)
    .pipe(
      tap((users) => console.log('🔍 UserList - Users from store:', users))
    );

  readonly loading$: Observable<boolean> = this.store
    .select(selectUsersLoading)
    .pipe(
      tap((loading) => console.log('🔍 UserList - Loading state:', loading))
    );

  readonly dataSource$: Observable<User[]> = this.users$.pipe(
    map((users) => users || []),
    tap((users) => console.log('🔍 UserList - DataSource users:', users))
  );

  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'job-role',
    'actions',
  ];

  ngOnInit(): void {
    console.log('🚀 UserListComponent initialized - dispatching loadUsers');
    this.store.dispatch(loadUsers());
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(deleteUser({ id }));
    }
  }
}
