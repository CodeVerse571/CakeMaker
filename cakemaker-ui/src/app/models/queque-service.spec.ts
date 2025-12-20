import { TestBed } from '@angular/core/testing';

import { QuequeService } from './queque-service';

describe('QuequeService', () => {
  let service: QuequeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuequeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
