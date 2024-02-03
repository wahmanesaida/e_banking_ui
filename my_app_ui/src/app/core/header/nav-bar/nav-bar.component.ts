import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthModule } from '../../../auth/auth.module';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  
})
export class NavBarComponent {

}
