import { Component, ElementRef, ViewChild } from '@angular/core';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";

@Component({
  selector: 'side-bar',
  templateUrl: './nav-bar-dash.component.html',
  styleUrl: './nav-bar-dash.component.css'
})
export class NavBarDashComponent {
  faArrowLeft = faArrowLeft;
  isSidebarOpen: boolean = false;
  isDropdownOpen: boolean = false;
  isDropdownOpen1: boolean = false; // Separate property for the first dropdown
  isDropdownOpen2: boolean = false; // Separate property for the second dropdown
  isDropdownOpen3: boolean = false;
  id:number;
  constructor(private router: Router) {}


  @ViewChild('sidebar') sidebar: ElementRef<HTMLElement>;
  @ViewChild('closeBtn') closeBtn: ElementRef<HTMLElement>;

  toggleSidebar() {
    this.sidebar.nativeElement.classList.toggle("open");
    this.menuBtnChange();


    this.isSidebarOpen = !this.isSidebarOpen;
    // Close the dropdown when the sidebar is closed
    if (!this.isSidebarOpen) {
      this.isDropdownOpen = false;
    }
  }

  menuBtnChange() {
    if (this.sidebar.nativeElement.classList.contains("open")) {
      this.closeBtn.nativeElement.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      this.closeBtn.nativeElement.classList.replace("bx-menu-alt-right", "bx-menu");
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



/*   toggleDropdown() {
    // Only toggle the dropdown if the sidebar is open
    if (this.isSidebarOpen) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  } */



  toggleDropdown(dropdownNumber: number) {
    if (this.isSidebarOpen) {
      if (dropdownNumber === 1) {
        this.isDropdownOpen1 = !this.isDropdownOpen1;
        this.isDropdownOpen3 = false;
        this.isDropdownOpen2 = false; // Close the second dropdown
      } else if (dropdownNumber === 2) {
        this.isDropdownOpen2 = !this.isDropdownOpen2;
        this.isDropdownOpen1 = false; // Close the first dropdown
        this.isDropdownOpen3 = false;
      } else if (dropdownNumber === 3) {
        this.isDropdownOpen3 = !this.isDropdownOpen3;
        this.isDropdownOpen1 = false; // Close the first dropdown
        this.isDropdownOpen2 = false;
      }
    }
  }



}
