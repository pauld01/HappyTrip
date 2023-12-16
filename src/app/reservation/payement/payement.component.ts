import { Component, Input } from '@angular/core';
import { validateCardNumber as cardNumberValidator, validateExpiryDate as expiryDateValidator } from '../../shared/validators/card-validator';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../shared/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../shared/models/reservation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.scss'
})
export class PayementComponent {
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  paymentSuccess: boolean = false;
  isCardNumberValid: boolean = true;
  isExpiryDateValid: boolean = true;
  @Input() reservation!: Reservation;
  reservationId!: string | null;

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.reservationId = params.get('idReservation');
    });
  }

  validateCardNumber(value: string): boolean {
    this.isCardNumberValid = cardNumberValidator(value);
    return this.isCardNumberValid;
  }

  validateExpiryDate(value: string): boolean {
    this.isExpiryDateValid = expiryDateValidator(value);
    return this.isExpiryDateValid;
  }

  submitReservation() {
    this.isCardNumberValid = this.validateCardNumber(this.cardNumber);
    this.isExpiryDateValid = this.validateExpiryDate(this.expiryDate);

    if (this.isCardNumberValid && this.isExpiryDateValid) {
      this.updatePayment();
    } else {
      console.error('Invalid card details.');
      if (!this.isCardNumberValid) console.error('Invalid card number.');
      if (!this.isExpiryDateValid) console.error('Invalid expiry date.');
    }
  }

  updatePayment() {
    if (this.reservation) {
      this.reservation.payment = true;
      this.reservationService.updateReservation(this.reservation);
      this.paymentSuccess = true;
    } else {
      console.error('Reservation object is undefined.');
      this.paymentSuccess = false;
    }
  }
  
}
