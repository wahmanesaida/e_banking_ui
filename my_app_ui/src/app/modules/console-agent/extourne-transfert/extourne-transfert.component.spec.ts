import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtourneTransfertComponent } from './extourne-transfert.component';

describe('ExtourneTransfertComponent', () => {
  let component: ExtourneTransfertComponent;
  let fixture: ComponentFixture<ExtourneTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtourneTransfertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtourneTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
