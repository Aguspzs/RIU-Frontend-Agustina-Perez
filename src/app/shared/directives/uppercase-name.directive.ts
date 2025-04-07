import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercaseName]',
  standalone: true,
})
export class UppercaseNameDirective {
  control = inject(NgControl);

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const upper = value.toUpperCase();
    this.control.control?.setValue(upper, { emitEvent: false });
  }
}
