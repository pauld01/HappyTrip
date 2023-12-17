import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { validateCardNumber as cardNumberValidator, validateExpiryDate as expiryDateValidator } from './card-checks';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ReservationService } from '../../shared/services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../shared/models/reservation';
import { CommonModule } from '@angular/common';
import { Supplement } from '../../shared/models/supplement';
import { Assurance } from '../../shared/models/assurance';
import { Vehicle } from '../../shared/models/vehicle';
import { AddDatePaymentPipe } from '../../shared/pipes/add-date-payment.pipe';
import { CardNumberValidatorDirective } from '../../shared/validators/card-number-validator';
import { ExpiryDateDirective } from '../../shared/validators/expiry-date-validator';

@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [FormsModule,CommonModule,AddDatePaymentPipe,CardNumberValidatorDirective,ExpiryDateDirective],
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.scss'
})
export class PayementComponent implements OnInit{
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  discountCode: string = '';
  originalTotalPrice: number = 0;
  isDiscountCodeValid: boolean = true;
  discountApplied: boolean = false;
  paymentSuccess: boolean = false;
  submissionAttempted: boolean = false;
  @Input() reservation!: Reservation;
  @Input() vehicleList: Vehicle[] = [];
  @Input() assurancesList: Assurance[] = [];
  @Input() supplementsList: Supplement[] = [];
  @ViewChild('reservationForm') reservationForm!: NgForm;
  @ViewChild('cardNumberField') cardNumberField!: NgModel;
  @ViewChild('expiryDateField') expiryDateField!: NgModel;
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

    ngOnInit() {
        this.getTotalPrice();
    }


  submitReservation() {
    this.submissionAttempted = true;
    if (this.cardNumberField.valid && this.expiryDateField.valid) {
      this.updatePayment();
    } else {
      console.error('Invalid form details.');
      if (this.cardNumberField.invalid) console.error('Invalid card number.');
      if (this.expiryDateField.invalid) console.error('Invalid expiry date.');
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

  validateDiscountCode() {
    if (this.discountApplied) {
      console.warn('Discount already applied.');
      return;
    }

    if (!this.discountCode) {
      this.isDiscountCodeValid = true;
      return;
    }

    this.reservationService.getPromotionCodeByCode(this.discountCode).subscribe(
      (promotionCodeData: any) => {
        if (promotionCodeData && promotionCodeData.length > 0) {
          this.applyDiscount();
          this.isDiscountCodeValid = true;
        } else {
          console.error('Invalid discount code.');
          this.isDiscountCodeValid = false;
          this.totalPrice = this.totalPrice;
        }
      },
      error => {
        console.error('Error fetching promotion code:', error);
        this.isDiscountCodeValid = false;
      }
    );
  }

  applyDiscount() {
    const discountPercentage = 10;
    this.totalPrice = this.totalPrice * (1 - discountPercentage / 100);
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
    this.discountApplied = true;
  }
  
}