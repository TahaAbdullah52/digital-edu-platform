import { TestBed } from '@angular/core/testing';

import { PaymentManagementService } from './payment-management.service';

describe('PaymentManagementService', () => {
  let service: PaymentManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
