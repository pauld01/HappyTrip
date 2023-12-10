import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../shared/models/user";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-form-update-user-infos',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-update-user-infos.component.html',
  styleUrl: './form-update-user-infos.component.scss'
})
export class FormUpdateUserInfosComponent implements OnInit{
  updateUserForm!: FormGroup;
  @Input() user?: User;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService
  ) {
    this.updateUserForm = this.formBuilder.group({
      surname: ['', Validators.required],
      mail: ['', Validators.required],
      name: ['', Validators.required],
      birthday: ['']
    });
  }

  ngOnInit() {
    if (this.user) {
      this.updateUserForm.patchValue({
        surname: this.user.surname,
        mail: this.user.mail,
        login: this.user.login,
        name: this.user.name,
        birthday: this.user.birthday
      });
    }
  }

  updateUser() {
    if (this.updateUserForm.invalid) { return; }

    if(this.user) {
      const updatedUser: User = {
        id: this.user.id,
        login: this.user.login,
        mail: this.updateUserForm.value.mail,
        password: this.user.password,
        name: this.updateUserForm.value.name,
        surname: this.updateUserForm.value.surname,
        birthday: this.updateUserForm.value.birthday
      };

      this.authService.updateUser(updatedUser).subscribe(user => {
        console.log('Utilisateur mis à jour :', user);
      });
    }
  }
}
