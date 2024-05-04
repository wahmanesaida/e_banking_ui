import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockingProcessComponent } from './blocking-process.component';

describe('BlockingProcessComponent', () => {
  let component: BlockingProcessComponent;
  let fixture: ComponentFixture<BlockingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockingProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
