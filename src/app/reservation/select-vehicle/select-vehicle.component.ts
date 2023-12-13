import {Component, Input} from '@angular/core';
import {Vehicle} from "../../shared/models/vehicle";
import {NgForOf} from "@angular/common";
import {CarTypePipe} from "../../shared/pipes/car-type.pipe";

@Component({
  selector: 'app-select-vehicle',
  standalone: true,
  imports: [
    NgForOf,
    CarTypePipe
  ],
  templateUrl: './select-vehicle.component.html',
  styleUrl: './select-vehicle.component.scss'
})
export class SelectVehicleComponent {
  @Input() vehicleList: Vehicle[] = [];

}
