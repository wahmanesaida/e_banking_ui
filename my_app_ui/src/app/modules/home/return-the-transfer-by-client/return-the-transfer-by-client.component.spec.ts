import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnTheTransferByClientComponent } from './return-the-transfer-by-client.component';

describe('ReturnTheTransferByClientComponent', () => {
  let component: ReturnTheTransferByClientComponent;
  let fixture: ComponentFixture<ReturnTheTransferByClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnTheTransferByClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnTheTransferByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
