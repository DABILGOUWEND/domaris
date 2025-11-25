import { Component, inject } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-new-user',
  imports: [ImportedModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {
  //injections
  auth=inject(AuthService);

  userForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      username: ['', Validators.required]
    });
  }
submit() {
  if (this.userForm.valid) {
    const formData = this.userForm.value;
    this.auth.Add_User(formData).subscribe({
      next: () => {
        console.log('User added successfully');
      },
      error: (err) => {
        console.error('Error adding user:', err);
      }
    });
  } else {
    console.log('Formulaire invalide');
  } 
  this.userForm.reset();
}


}
