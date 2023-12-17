import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import {User} from "../../shared/models/user";

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
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      birthday: [''],
      login: ['']
    }, { validators: this.checkPasswords });
  }

  ShowOrHide() {
    this.isDisplayed = !this.isDisplayed;
  }

  addUser() {
    if (this.registerForm.invalid){ return; }
    this.authService.addUser(
        new User(
            this.registerForm.value.login,
            this.registerForm.value.password,
            this.registerForm.value.name,
            this.registerForm.value.surname
        )
    );
    this.router.navigate(['/']);
  }

  private checkPasswords(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value !== confirmPassword?.value ? { missMatch: true } : null;
  }
}
