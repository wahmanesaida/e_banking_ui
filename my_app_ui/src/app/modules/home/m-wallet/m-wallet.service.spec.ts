import { TestBed } from '@angular/core/testing';

import { MWalletService } from './m-wallet.service';

describe('MWalletService', () => {
  let service: MWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
