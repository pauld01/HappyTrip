import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  homeImageUrl: string = 'assets/auto-home.svg';

  onAutoButtonClick(): void {
    this.homeImageUrl = 'assets/auto-home.svg';
  }

  onUtilitaireButtonClick(): void {
    this.homeImageUrl = 'assets/vw-transporter.png';
  }
}
