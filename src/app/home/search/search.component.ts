import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  isDisplayed : boolean = false;
  isShowed : boolean = true

  ShowOrHide() {
    this.isDisplayed = !this.isDisplayed;
  }

  ShowOrHideField() {
    this.isShowed = !this.isShowed;
  }
}
