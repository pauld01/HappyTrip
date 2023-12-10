import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../shared/models/user";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-form-update-user-password',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-update-user-password.component.html',
  styleUrl: './form-update-user-password.component.scss'
})
export class FormUpdateUserPasswordComponent implements OnInit {
  updatePasswordUserForm!: FormGroup;
  @Input() user?: User;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService
  ) {
    this.updatePasswordUserForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required], [this.oldPasswordValidator.bind(this)]],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    },
        { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    if (this.user) {
      this.updatePasswordUserForm.patchValue({
        surname: this.user.surname,
        mail: this.user.mail,
        login: this.user.login,
        name: this.user.name,
        password: this.user.password,
        birthday: this.user.birthday
      });
    }
  }

  oldPasswordValidator(control: AbstractControl) {
    const oldPassword = control.value;
    const userPassword: string = this.user ? this.user.password : '';

    return oldPassword === userPassword ? null : { invalidOldPassword: true };
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmNewPassword = group.get('confirmNewPassword')?.value;

    return newPassword === confirmNewPassword ? null : { mismatch: true };
  }

  updatePassword() {
    if (this.updatePasswordUserForm.invalid) {
      alert('Ancien mot de passe incorrect ou nouveau non identique !');
      return;
    }

    if(this.user) {
      const updatedUser: User = {
        id: this.user.id,
        login: this.user.login,
        mail: this.user.mail,
        password: this.updatePasswordUserForm.value.newPassword,
        name: this.user.name,
        surname: this.user.surname,
        birthday: this.user.birthday
      };

      this.authService.updateUser(updatedUser).subscribe(user => {
        console.log('Mot de passe utilisateur mis à jour :', user);
      });
    }

  }
}
