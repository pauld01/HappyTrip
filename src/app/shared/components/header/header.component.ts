import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isUserConnected: boolean = false;

  constructor(
      private authService: AuthService,
      private router: Router
  ) {}

  ngOnInit() {
    this.isUserConnected = this.authService.isUserConnected();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}