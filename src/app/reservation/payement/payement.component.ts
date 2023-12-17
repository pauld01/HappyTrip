import {Component, Input, OnInit} from '@angular/core';
import { validateCardNumber as cardNumberValidator, validateExpiryDate as expiryDateValidator } from '../../shared/validators/card-validator';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../shared/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../shared/models/reservation';
import {Vehicle} from "../../shared/models/vehicle";
import {Assurance} from "../../shared/models/assurance";
import {Supplement} from "../../shared/models/supplement";
@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.scss'
})
export class PayementComponent implements OnInit{
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  @Input() reservation!: Reservation;
  @Input() vehicleList: Vehicle[] = [];
  @Input() assurancesList: Assurance[] = [];
  @Input() supplementsList: Supplement[] = [];

  reservationId!: string | null;

  totalPrice: number = 0;
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

    ngOnInit() {
        this.getTotalPrice();
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
      if (isCardNumberValid && isExpiryDateValid) {
          this.updatePayment();
      } else {
          console.error('Invalid card details.');
          if (!isCardNumberValid) console.error('Invalid card number.');
          if (!isExpiryDateValid) console.error('Invalid expiry date.');
      }
  }

  updatePayment() {
    if (this.reservation) {
      this.reservation.payment = true;
      this.reservationService.updateReservation(this.reservation);
    } else {
      console.error('Reservation object is undefined.');
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