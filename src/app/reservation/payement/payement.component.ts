import {Component, Input, OnInit} from '@angular/core';
import { validateCardNumber as cardNumberValidator, validateExpiryDate as expiryDateValidator } from '../../shared/validators/card-validator';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../shared/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../shared/models/reservation';
import { CommonModule } from '@angular/common';
import { Supplement } from '../../shared/models/supplement';
import { Assurance } from '../../shared/models/assurance';
import { Vehicle } from '../../shared/models/vehicle';
import { AddDatePaymentPipe } from '../../shared/pipes/add-date-payment.pipe';

@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [FormsModule,CommonModule,AddDatePaymentPipe],
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.scss'
})
export class PayementComponent implements OnInit{
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  paymentSuccess: boolean = false;
  isCardNumberValid: boolean = true;
  isExpiryDateValid: boolean = true;
  @Input() reservation!: Reservation;
  @Input() vehicleList: Vehicle[] = [];
  @Input() assurancesList: Assurance[] = [];
  @Input() supplementsList: Supplement[] = [];
  totalPrice: number = 0;
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
    ngOnInit() {
        this.getTotalPrice();
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
      this.reservation.final_price = this.totalPrice;
      this.reservationService.updateReservation(this.reservation);
      this.paymentSuccess = true;
    } else {
      console.error('Reservation object is undefined.');
      this.paymentSuccess = false;
    }
  }

  getTotalPrice(){
    const departureDateTime = new Date(this.reservation.date_departure);
    const arrivalDateTime = new Date(this.reservation.date_arrival);

    const daysDifference = Math.ceil((arrivalDateTime.getTime() - departureDateTime.getTime()) / (1000 * 3600 * 24));

    const vehicle = this.vehicleList.find(vehicle => vehicle.id === this.reservation.vehicle);
    this.totalPrice = daysDifference * (vehicle?.price || 0);

    const insurance = this.assurancesList.find(assurance => assurance.id === this.reservation.assurance);
    if (insurance) {
      this.totalPrice += (insurance.price || 0) * daysDifference;
    }
    const supplements = this.supplementsList.filter(supplement => this.reservation.supplements.includes(supplement.id));
    supplements.forEach(supplement => {
      this.totalPrice += supplement.price || 0;
    });
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
    console.log(this.reservation);
  }
  
}