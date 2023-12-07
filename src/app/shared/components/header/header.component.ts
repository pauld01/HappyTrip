import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isUserConnected: boolean = false;

  constructor(
      private authService: AuthService
  ) {
    this.isUserConnected = authService.isUserConnected();
  }

  ngOnInit() {
    this.isUserConnected = this.authService.isUserConnected();
  }

  logout() {
    this.authService.logout();
  }
}
