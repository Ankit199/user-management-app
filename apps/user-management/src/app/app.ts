import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { logout } from '@user-management-app/shared-state';
import { selectIsAuthenticated, selectCurrentUser } from '@user-management-app/shared-state';
import { User } from '@user-management-app/data-access';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly isAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated);
  readonly currentUser$: Observable<User | null> = this.store.select(selectCurrentUser);

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}