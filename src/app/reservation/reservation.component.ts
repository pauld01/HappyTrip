
import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservationService } from '../shared/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;

  assurances: any[] = [];
  @ViewChildren('assuranceElement') assuranceElements!: QueryList<ElementRef>;


  constructor(private fb: FormBuilder, private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationForm = this.fb.group({
      insurance: ['']
    });

    this.reservationService.getAssurances().subscribe(data => {
      this.assurances = data;
    });
  }

  onSubmit() {
    console.log(this.reservationForm.value);
  }
}
