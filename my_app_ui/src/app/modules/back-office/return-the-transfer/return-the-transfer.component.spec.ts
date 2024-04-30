import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnTheTransferComponent } from './return-the-transfer.component';

describe('ReturnTheTransferComponent', () => {
  let component: ReturnTheTransferComponent;
  let fixture: ComponentFixture<ReturnTheTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnTheTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnTheTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
