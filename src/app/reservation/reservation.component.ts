import { Component } from '@angular/core';
import { validateCardNumber as cardNumberValidator, validateExpiryDate as expiryDateValidator } from '../validators/card-validator';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
    cardNumber: string = '';
    expiryDate: string = '';
    cvv: string = '';

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
            console.log('Card details are valid. Proceeding with reservation.');
            console.log(`Card Number: ${this.cardNumber}, Expiry Date: ${this.expiryDate}`);
        } else {
            console.error('Invalid card details.');
            if (!isCardNumberValid) console.error('Invalid card number.');
            if (!isExpiryDateValid) console.error('Invalid expiry date.');
        }
    }
}
