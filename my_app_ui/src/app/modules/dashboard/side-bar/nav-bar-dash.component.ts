import { Component, ElementRef, ViewChild } from '@angular/core';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'side-bar',
  templateUrl: './nav-bar-dash.component.html',
  styleUrl: './nav-bar-dash.component.css'
})
export class NavBarDashComponent {
  faArrowLeft = faArrowLeft;
  isSidebarOpen: boolean = false;
  isDropdownOpen: boolean = false;


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

  

  toggleDropdown() {
    // Only toggle the dropdown if the sidebar is open
    if (this.isSidebarOpen) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }



}
