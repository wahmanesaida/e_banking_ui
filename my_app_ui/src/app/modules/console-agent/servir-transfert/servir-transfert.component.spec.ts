import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServirTransfertComponent } from './servir-transfert.component';

describe('ServirTransfertComponent', () => {
  let component: ServirTransfertComponent;
  let fixture: ComponentFixture<ServirTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServirTransfertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServirTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
