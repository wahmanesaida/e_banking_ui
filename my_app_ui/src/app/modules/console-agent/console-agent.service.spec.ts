import { TestBed } from '@angular/core/testing';

import { ConsoleAgentService } from './console-agent.service';

describe('ConsoleAgentService', () => {
  let service: ConsoleAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
