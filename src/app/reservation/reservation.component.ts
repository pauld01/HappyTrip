import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservationService } from '../shared/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, AfterViewInit {
  assurances: any[] = [];
  reservationForm!: FormGroup;
@ViewChildren('insuranceCheckbox') insuranceElements!: QueryList<ElementRef>;
  constructor(private fb: FormBuilder, private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationForm = this.fb.group({
      insurance: ['']
    });

    this.reservationService.getAssurances().subscribe(data => {
      this.assurances = data;
    });
  }

  ngAfterViewInit() {
    // Now you can access this.insuranceElements
    this.insuranceElements.changes.subscribe(() => {
      // Logic that depends on this.insuranceElements
    });
  }

  onSubmit() {
    console.log(this.reservationForm.value);
  }
}