import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ReservationService} from "../shared/services/reservation/reservation.service";
import {User} from "../shared/models/user";
import {Reservation} from "../shared/models/reservation";
import {switchMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    onglet: number = 1;
    currentUser: User | undefined;
    userReservations: Reservation[] = [];

    constructor(
      private authService: AuthService,
      private reservationService: ReservationService,
      private router: Router
    ) {}

    ngOnInit() {
        this.authService.getSavedUserInfo().subscribe(
            (user: any) => {
                this.currentUser = user[0];
                this.loadUserReservations();
            },
            (error) => {
                console.error('Une erreur s\'est produite :', error);
            }
        );
    }

    loadUserReservations() {
        if (this.currentUser) {
            this.reservationService.getReservationsOfUser(this.currentUser).subscribe(
                (reservations: any) => {
                    this.userReservations = reservations;
                },
                (error) => {
                    console.error('Une erreur s\'est produite :', error);
                }
            );
        } else {
            console.warn('currentUser is undefined. Cannot load user reservations.');
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
