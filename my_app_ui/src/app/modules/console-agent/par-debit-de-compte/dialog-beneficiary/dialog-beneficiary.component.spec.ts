import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBeneficiaryComponent } from './dialog-beneficiary.component';

describe('DialogBeneficiaryComponent', () => {
  let component: DialogBeneficiaryComponent;
  let fixture: ComponentFixture<DialogBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBeneficiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
