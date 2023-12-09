import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../shared/services/search/search.service";
import {Station} from "../../shared/models/station";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  ages: number[] = [18, 19, 20, 21, 22, 23, 24];
  stations: Station[] = [];
  homeImageUrl: string = 'assets/auto-home.svg';

  constructor(
      private searchService: SearchService
  ) {

  }

  ngOnInit() {
    this.searchService.getAllStations().subscribe(
        (stations: any) => {
          this.stations = stations;
        },
        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
    );
  }

  onAutoButtonClick(): void {
    this.homeImageUrl = 'assets/auto-home.svg';
  }

  onUtilitaireButtonClick(): void {
    this.homeImageUrl = 'assets/transporter-home.png';
  }
}
