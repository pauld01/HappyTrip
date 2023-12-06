import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isDisplayed : boolean = false;

  ShowOrHide() {
    this.isDisplayed = !this.isDisplayed;
  }
}
