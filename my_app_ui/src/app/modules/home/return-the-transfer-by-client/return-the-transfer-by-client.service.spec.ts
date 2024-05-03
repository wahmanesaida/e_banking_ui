import { TestBed } from '@angular/core/testing';

import { ReturnTheTransferByClientService } from './return-the-transfer-by-client.service';

describe('ReturnTheTransferByClientService', () => {
  let service: ReturnTheTransferByClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnTheTransferByClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
