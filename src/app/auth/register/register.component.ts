import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isDisplayed : boolean = false;
  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', Validators.required),
    }, { validators: this.checkPasswords });
  }

  ShowOrHide() {
    this.isDisplayed = !this.isDisplayed;
  }

  addUser() {
    if (this.registerForm.invalid) return;
    this.authService.addUser({
      login: this.registerForm.value.login,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      birthday: this.registerForm.value.birthday,
    });
    this.router.navigate(['/login']);
  }

  private checkPasswords(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value !== confirmPassword?.value ? { missMatch: true } : null;
  }
}
