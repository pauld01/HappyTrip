import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDisableOthers]'
})
export class DisableOthersDirective implements OnInit {
  @Input() insuranceOptions!: ElementRef[]; // Utilisation du non-null assertion operator

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.el.nativeElement.addEventListener('change', (event: Event) => {

      this.insuranceOptions.forEach(option => {
        if (option.nativeElement !== this.el.nativeElement) {
          this.renderer.setProperty(option.nativeElement, 'disabled', this.el.nativeElement.checked);
        }
      });
    });
  }
}
