import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthModule } from '../../../auth/auth.module';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',

})
export class NavBarComponent {
  constructor(private router: Router) {


  }
  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }


  logout() {
    // Autres opérations de déconnexion si nécessaire

    // Réinitialiser les variables d'authentification

    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('id');
    localStorage.removeItem('role');

    // Rediriger vers la page de connexion ou une autre page appropriée
    this.router.navigateByUrl('Auth/signup');
  }

  protected readonly localStorage = localStorage;
}
