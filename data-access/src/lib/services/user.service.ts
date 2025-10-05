import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
 providedIn: 'root'
})
export class UserService {
 private readonly http = inject(HttpClient);
 private readonly apiUrl = 'http://localhost:3001';

 getUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.apiUrl}/users`);
 }

 getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/users/${id}`);
 }

 createUser(user: Omit<User, 'id'>): Observable<User> {
  return this.http.post<User>(`${this.apiUrl}/users`, user);
 }

 updateUser(id: number, user: Partial<User>): Observable<User> {
  return this.http.patch<User>(`${this.apiUrl}/users/${id}`, user);
 }

 deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
 }
}