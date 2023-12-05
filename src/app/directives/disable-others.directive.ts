import { Directive, Input, ElementRef, Renderer2, OnInit, QueryList } from '@angular/core';

@Directive({
  selector: '[appDisableOthers]'
})
export class DisableOthersDirective implements OnInit {
  @Input() insuranceOptions!: QueryList<ElementRef>;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.el.nativeElement.addEventListener('change', () => {
      this.insuranceOptions.forEach(option => {
        if (option.nativeElement !== this.el.nativeElement) {
          this.renderer.setProperty(option.nativeElement, 'disabled', this.el.nativeElement.checked);
        }
      });
    });
  }
}