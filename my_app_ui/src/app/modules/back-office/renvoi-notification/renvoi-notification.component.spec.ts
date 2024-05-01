import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenvoiNotificationComponent } from './renvoi-notification.component';

describe('RenvoiNotificationComponent', () => {
  let component: RenvoiNotificationComponent;
  let fixture: ComponentFixture<RenvoiNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenvoiNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenvoiNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
