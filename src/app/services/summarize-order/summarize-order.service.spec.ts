import { TestBed } from '@angular/core/testing';

import { SummarizeOrderService } from './summarize-order.service';

describe('SummarizeOrderService', () => {
  let service: SummarizeOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummarizeOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
