import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  homeImageUrl: string = 'assets/auto-home.svg';
  isDisplayed : boolean = false;
  isShowed : boolean = true
  ages: number[] = [18, 19, 20, 21, 22, 23, 24];

  ShowOrHide() {
    this.isDisplayed = !this.isDisplayed;
  }

  ShowOrHideField() {
    this.isShowed = !this.isShowed;
  }

  onAutoButtonClick(): void {
    this.homeImageUrl = 'assets/auto-home.svg';
  }

  onUtilitaireButtonClick(): void {
    this.homeImageUrl = 'assets/vw-transporter.png';
  }
}
