import { NgModule } from '@angular/core';
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
import {ImageSwitcherComponent} from "./shared/components/image-switcher/image-switcher.component";
import {FormUpdateUserInfosComponent} from "./profile/form-update-user-infos/form-update-user-infos.component";
import {FormUpdateUserPasswordComponent} from "./profile/form-update-user-password/form-update-user-password.component";
import {SelectVehicleComponent} from "./reservation/select-vehicle/select-vehicle.component";
import {SelectExtrasComponent} from "./reservation/select-extras/select-extras.component";
import {PayementComponent} from "./reservation/payement/payement.component";
import { DisableOtherCheckboxesDirective } from './directives/disable-other-checkboxes.directive';



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
        SelectVehicleComponent,
        SelectExtrasComponent,
        PayementComponent,
        DisableOtherCheckboxesDirective
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
