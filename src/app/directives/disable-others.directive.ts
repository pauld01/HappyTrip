import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appDisableOthers]'
})
export class DisableOthersDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.checkAndDisable();
  }

  @HostListener('change') onChange() {
    this.checkAndDisable();
  }

  private checkAndDisable() {
    const isChecked = this.el.nativeElement.checked;
    const parent = this.el.nativeElement.parentNode;
    const checkboxes = parent.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox: any) => {
      if (checkbox !== this.el.nativeElement) {
        this.renderer.setProperty(checkbox, 'disabled', isChecked);
      }
    });
  }
}