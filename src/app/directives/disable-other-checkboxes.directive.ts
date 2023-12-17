import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appDisableOtherCheckboxes]'
})
export class DisableOtherCheckboxesDirective implements OnInit {
  @Input('appDisableOtherCheckboxes') groupName!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.manageCheckboxGroup(this.groupName);
  }

  manageCheckboxGroup(group: string): void {
    const parentElement = this.el.nativeElement.closest(group);
    const checkboxes = parentElement.querySelectorAll('input[type="checkbox"]');

    this.renderer.listen(this.el.nativeElement, 'change', (event) => {
      if (event.target.checked) {
        checkboxes.forEach((checkbox: HTMLInputElement) => {
          if (checkbox !== event.target) {
            this.renderer.setProperty(checkbox, 'disabled', true);
          }
        });
      } else {
        checkboxes.forEach((checkbox: HTMLInputElement) => {
          this.renderer.setProperty(checkbox, 'disabled', false);
        });
      }
    });
  }
}
