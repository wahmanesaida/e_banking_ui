import { TestBed } from '@angular/core/testing';

import { GabBoaService } from './gab-boa.service';

describe('GabBoaService', () => {
  let service: GabBoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GabBoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
