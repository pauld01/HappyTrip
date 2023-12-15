import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableOthers]'
})
export class DisableOthersDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('change') onChange() {
    const parent = this.el.nativeElement.parentNode;
    const siblings = parent.children;
    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];
      if (sibling !== this.el.nativeElement) {
        this.renderer.setProperty(sibling, 'disabled', this.el.nativeElement.checked);
      }
    }
  }
}