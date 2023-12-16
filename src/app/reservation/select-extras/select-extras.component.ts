import {Component, Input} from '@angular/core';
import {Assurance} from "../../shared/models/assurance";
import { Reservation } from '../../shared/models/reservation';
import {ReservationService} from "../../shared/services/reservation.service";
import {NgForOf} from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { Supplement } from '../../shared/models/supplement';
import { HighlightDirective } from '../../directives/highlight.directive';
import { DisableOthersDirective } from '../../directives/disable-others.directive';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DisableOtherCheckboxesDirective } from '../../directives/disable-other-checkboxes';

@Component({
  selector: 'app-select-extras',
  standalone: true,
  imports: [NgForOf,HighlightDirective,DisableOthersDirective,ReactiveFormsModule,DisableOtherCheckboxesDirective],
  templateUrl: './select-extras.component.html',
  styleUrl: './select-extras.component.scss'
})
export class SelectExtrasComponent {
  @Input() assurancesList: Assurance[] = [];
  @Input() supplementsList: Supplement[] = [];
  @Input() reservation!: Reservation;
  selectedAssuranceId: string | null = null;
  reservationId!: string | null;
  color = 'yellow';
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
  assurancesForm = new FormGroup({});

  // Assuming checkedTickets should hold strings
checkedTickets: string[] = [];
selectedSupplementId: string | null = null;

onCheck(evt: string) {
  const index = this.checkedTickets.indexOf(evt);
  if (index === -1) {
    this.checkedTickets.push(evt);
  } else {
    this.checkedTickets.splice(index, 1);
  }
  console.log(this.checkedTickets);
}



  ngOnInit() {
    // this.assurancesList.forEach((assurance, index) => {
    //   this.assurancesForm.addControl('assurance' + index, new FormControl(false));
    // });
  }

  onSubmit() {
    console.log(this.assurancesForm.value);
    // Process the selected assurances here
  }
  updateAssurancesAndSupplements() {
    this.selectAssurance();
    this.selectSupplement();
  }

  private selectAssurance() {
    if (this.selectedAssuranceId) {
      this.reservation.assurance = this.selectedAssuranceId;
      this.reservationService.updateReservation(this.reservation);
    }
  }

  private selectSupplement() {
    if (this.selectedSupplementId) {
      this.reservation.supplements.push(this.selectedSupplementId as never);
      this.reservationService.updateReservation(this.reservation);
    }
  }
  

  onAssuranceSelected(id: string) {
    this.selectedAssuranceId = id;
  }

  onSupplementSelected(id: string) {
    this.selectedSupplementId = id;
  }
  // selectExtras(supplementId: string) {
  //   if (!this.reservation.supplements) {
  //     this.reservation.supplements = [];
  //   }
  //   this.reservation.supplements.push(supplementId as never);
  //   this.reservationService.updateReservation(this.reservation);
  // }

  

  // selectAssurance(idAssurance: string | null) {
  //   if (idAssurance) {
  //     this.reservation.assurance = idAssurance;
  //     this.reservationService.updateReservation(this.reservation);
  //   }
  // }
  

  
}
