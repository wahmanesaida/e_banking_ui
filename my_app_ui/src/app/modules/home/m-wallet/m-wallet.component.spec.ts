import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MWalletComponent } from './m-wallet.component';

describe('MWalletComponent', () => {
  let component: MWalletComponent;
  let fixture: ComponentFixture<MWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MWalletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
