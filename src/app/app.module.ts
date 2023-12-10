import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {ProfileComponent} from "./profile/profile.component";
import {HomeComponent} from "./home/home.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchComponent} from "./home/search/search.component";
import { DisableOthersDirective } from './directives/disable-others.directive';
import {ImageSwitcherComponent} from "./shared/components/image-switcher/image-switcher.component";
import {FormUpdateUserInfosComponent} from "./profile/form-update-user-infos/form-update-user-infos.component";
import {FormUpdateUserPasswordComponent} from "./profile/form-update-user-password/form-update-user-password.component";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ProfileComponent,
        HomeComponent,
        ReservationComponent,
        LoginComponent,
        RegisterComponent,
        SearchComponent,
        DisableOthersDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ImageSwitcherComponent,
        FormUpdateUserInfosComponent,
        FormUpdateUserPasswordComponent,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
