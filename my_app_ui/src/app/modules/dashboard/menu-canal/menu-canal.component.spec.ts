import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCanalComponent } from './menu-canal.component';

describe('MenuCanalComponent', () => {
  let component: MenuCanalComponent;
  let fixture: ComponentFixture<MenuCanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCanalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuCanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
