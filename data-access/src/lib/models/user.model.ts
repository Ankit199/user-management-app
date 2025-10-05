export interface User {
 id: number;
 username: string;
 email: string;
 'job-role': JobRole;
}

export type JobRole = 'tech' | 'id' | 'gd' | 'qa';

export interface LoginCredentials {
 username: string;
 password: string;
}

export interface AuthState {
 isAuthenticated: boolean;
 user: User | null;
 error: string | null;
}