import { Component, ElementRef, ViewChild } from '@angular/core';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'side-bar',
  templateUrl: './nav-bar-dash.component.html',
  styleUrl: './nav-bar-dash.component.css'
})
export class NavBarDashComponent {
  faArrowLeft = faArrowLeft;


  @ViewChild('sidebar') sidebar: ElementRef<HTMLElement>;
  @ViewChild('closeBtn') closeBtn: ElementRef<HTMLElement>;

  toggleSidebar() {
    this.sidebar.nativeElement.classList.toggle("open");
    this.menuBtnChange();
  }

  menuBtnChange() {
    if (this.sidebar.nativeElement.classList.contains("open")) {
      this.closeBtn.nativeElement.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      this.closeBtn.nativeElement.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }


}
