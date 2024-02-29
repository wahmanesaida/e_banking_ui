import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParDebitDeCompteComponent } from './par-debit-de-compte.component';

describe('ParDebitDeCompteComponent', () => {
  let component: ParDebitDeCompteComponent;
  let fixture: ComponentFixture<ParDebitDeCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParDebitDeCompteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParDebitDeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
