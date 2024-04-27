import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationTransfertComponent } from './consultation-transfert.component';

describe('ConsultationTransfertComponent', () => {
  let component: ConsultationTransfertComponent;
  let fixture: ComponentFixture<ConsultationTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultationTransfertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
