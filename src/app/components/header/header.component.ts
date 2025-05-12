import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule } from '@angular/router';
import { PrimButtonComponent } from "../prim-button/prim-button.component";
import { AuthComponent } from "../../pages/auth/auth.component";

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule, RouterModule, PrimButtonComponent, AuthComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
