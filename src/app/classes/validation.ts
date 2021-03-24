/* tslint:disable:space-before-function-paren */
import {Validators} from '@angular/forms';
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Validation {

  static password = [Validators.required, Validators.maxLength(30), Validators.minLength(6)];
  static email = [Validators.required, Validators.pattern(emailRegex), Validators.maxLength(60)];

}

