import { Component, Input } from '@angular/core';
import { validateCardNumber as cardNumberValidator, validateExpiryDate as expiryDateValidator } from '../../shared/validators/card-validator';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../shared/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../shared/models/reservation';
@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.scss'
})
export class PayementComponent {
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  @Input() reservation!: Reservation;
  reservationId!: string | null;
  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
) {
  this.route.paramMap.subscribe(
      (params) => {
        this.reservationId = params.get('idReservation');
      }
  );
}
  validateCardNumber(value: string): boolean {
      return cardNumberValidator(value);
  }

  validateExpiryDate(value: string): boolean {
      return expiryDateValidator(value);
  }
  

  submitReservation() {
      const isCardNumberValid = this.validateCardNumber(this.cardNumber);
      const isExpiryDateValid = this.validateExpiryDate(this.expiryDate);
      // Since you want to remove CVV validation, we will not check it here
      if (isCardNumberValid && isExpiryDateValid) {
        console.log(`Expiry Date: ${this.reservationId}`);
          console.log('Card details are valid. Proceeding with reservation.');
          console.log(`Card Number: ${this.cardNumber}, Expiry Date: ${this.expiryDate}`);
          this.updatePayment();
      } else {
          console.error('Invalid card details.');
          if (!isCardNumberValid) console.error('Invalid card number.');
          if (!isExpiryDateValid) console.error('Invalid expiry date.');
      }
  }

  updatePayment() {
    this.reservation.payment = true;
    this.reservationService.updateReservation(this.reservation);
  }
}
