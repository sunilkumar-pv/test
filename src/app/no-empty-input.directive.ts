import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTrimInput]'
})
export class NoEmptyInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string): void {
    const trimmedValue = value.trim();
    this.el.nativeElement.value = trimmedValue;
  }
}
