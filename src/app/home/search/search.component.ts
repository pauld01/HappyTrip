import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../shared/services/search.service";
import {Station} from "../../shared/models/station";
import {ReservationService} from "../../shared/services/reservation.service";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user";
import {Reservation} from "../../shared/models/reservation";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  ages: number[] = [18, 19, 20, 21, 22, 23, 24];
  stations: Station[] = [];
  homeImageUrl: string = 'assets/auto-home.svg';
  isDisplayed : boolean = false ;
  isShowed : boolean = true ;
  searchForm!: FormGroup;
  currentUserId: string = "";

  constructor(
      private searchService: SearchService,
      private reservationService: ReservationService,
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private router: Router
  ) { }

  ngOnInit() {
    this.searchService.getAllStations().subscribe(
        (stations: any) => {
          this.stations = stations;
        },
        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
    );

    this.authService.getSavedUserInfo().subscribe(
        (user: any) => {
          this.currentUserId = user.id;
        },
        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
    );

    this.searchForm = this.formBuilder.group({
      station_departure: new FormControl('', Validators.required),
      station_arrival: new FormControl('', Validators.required),
      date_departure: new FormControl('', Validators.required),
      date_arrival: new FormControl('', Validators.required)
    });
  }

  onAutoButtonClick(): void {
    this.homeImageUrl = 'assets/auto-home.svg';
  }

  onUtilitaireButtonClick(): void {
    this.homeImageUrl = 'assets/vw-transporter.png';
  }

  ShowOrHide() {
    this.isDisplayed = !this.isDisplayed;
  }

  ShowOrHideField() {
    this.isShowed = !this.isShowed;
  }

  createReservation() {
    if (this.searchForm.invalid){ return; }
    const newReservation = new Reservation(
        this.currentUserId,
        "",
        "1", //par défaut basic
        [],
        this.searchForm.value.station_departure,
        this.searchForm.value.station_arrival,
        this.searchForm.value.date_departure,
        this.searchForm.value.date_arrival,
    );
    this.reservationService.addReservation(newReservation);

    this.router.navigate(['/reservation/'+newReservation.id]);
  }
}