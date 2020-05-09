import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';



@Directive({
  selector: '[appForbiddenValue]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }]
})
export class ForbiddenValidatorDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } | null {
    let regEx = /^[0-9]*$/gm;
    let result = regEx.test(control.value);
    if (!result)
      return { 'forbiddenValue': true };
    return null;
  }
  
}
