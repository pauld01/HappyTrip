import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {HelpComponent} from "./home/help/help.component";


const routes: Routes = [
  {
    path: 'search',
    component: HomeComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'reservation/:idReservation',
    component: ReservationComponent
  },
  {
    path: 'aide',
    component: HelpComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }