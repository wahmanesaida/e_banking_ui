import { Component } from '@angular/core';
import { NavBarComponent } from '../../core/header/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../core/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { FeatureComponent } from './pages/feature/feature.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { NewsletterComponent } from './pages/newsletter/newsletter.component';
import { SignupComponent } from '../../auth/signup/signup.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, HeaderComponent, AboutComponent, FeatureComponent, OurServicesComponent, NewsletterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
