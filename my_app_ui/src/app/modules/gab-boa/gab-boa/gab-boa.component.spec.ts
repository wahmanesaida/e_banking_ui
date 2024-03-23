import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GabBoaComponent } from './gab-boa.component';

describe('GabBoaComponent', () => {
  let component: GabBoaComponent;
  let fixture: ComponentFixture<GabBoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GabBoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GabBoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
