import { TestBed } from '@angular/core/testing';

import { BeneficiairesService } from './beneficiaires.service';

describe('BeneficiairesService', () => {
  let service: BeneficiairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
