import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prim-button',
  standalone: true,
  template: `<button (click)="onClick()"><ng-content></ng-content></button>`,
  styleUrls: ['./prim-button.component.css']
})
export class PrimButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
