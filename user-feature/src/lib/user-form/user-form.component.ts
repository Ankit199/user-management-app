import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { User, JobRole } from '@user-management-app/data-access';
import { addUser, updateUser } from '@user-management-app/shared-state';
import { selectUserById } from '@user-management-app/shared-state';

@Component({
  selector: 'lib-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  readonly userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    'job-role': ['tech' as JobRole, Validators.required],
  });

  readonly jobRoles: JobRole[] = ['tech', 'id', 'gd', 'qa'];
  isEditMode = false;
  userId: number | null = null;

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => {
          if (id) {
            this.isEditMode = true;
            this.userId = +id;
            return this.store.select(selectUserById(+id));
          }
          return [null];
        })
      )
      .subscribe((user) => {
        if (user) {
          this.userForm.patchValue(user);
        }
      });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value as Omit<User, 'id'>;

      if (this.isEditMode && this.userId) {
        this.store.dispatch(
          updateUser({ user: { ...userData, id: this.userId } as User })
        );
      } else {
        this.store.dispatch(addUser({ user: userData }));
      }

      this.router.navigate(['/users']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
