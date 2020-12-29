import { TestBed } from '@angular/core/testing';

import { BatchsService } from './batchs.service';

describe('BatchsService', () => {
  let service: BatchsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
