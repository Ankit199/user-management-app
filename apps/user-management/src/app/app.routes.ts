import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectIsAuthenticated } from '@user-management-app/shared-state';

export const routes: Routes = [
 {
  path: 'login',
  loadComponent: () =>
   import('@user-management-app/features-auth').then(m => m.LoginComponent)
 },
 {
  path: 'users',
  canActivate: [() => {
   const store = inject(Store);
   return store.select(selectIsAuthenticated).pipe(
    map(isAuthenticated => isAuthenticated || '/login')
   );
  }],
  children: [
   {
    path: '',
    loadComponent: () =>
     import('@user-management-app/features-users').then(m => m.UserListComponent)
   },
   {
    path: 'new',
    loadComponent: () =>
     import('@user-management-app/features-users').then(m => m.UserFormComponent)
   },
   {
    path: ':id/edit',
    loadComponent: () =>
     import('@user-management-app/features-users').then(m => m.UserFormComponent)
   }
  ]
 },
 { path: '', redirectTo: '/login', pathMatch: 'full' },
 { path: '**', redirectTo: '/login' }
];