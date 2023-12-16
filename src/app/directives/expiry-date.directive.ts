import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { validateExpiryDate } from '../shared/validators/card-validator';

@Directive({
  selector: '[appValidateExpiry]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ExpiryDateDirective,
      multi: true
    }
  ]
})
export class ExpiryDateDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} | null {
    return validateExpiryDate(control.value) ? null : {'expiryDateInvalid': true};
  }
}