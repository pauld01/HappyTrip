import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { validateCardNumber } from '../../reservation/payement/card-checks';

@Directive({
  selector: '[appValidateCardNumber]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: CardNumberValidatorDirective, multi: true }]
})
export class CardNumberValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return validateCardNumber(control.value) ? null : { invalidCardNumber: true };
  }
}
