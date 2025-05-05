import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule } from '@angular/router';
import { PrimButtonComponent } from "../prim-button/prim-button.component";

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule, RouterModule, PrimButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
