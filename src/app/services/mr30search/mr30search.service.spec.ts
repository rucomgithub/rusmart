import { TestBed } from '@angular/core/testing';

import { Mr30searchService } from './mr30search.service';

describe('Mr30searchService', () => {
  let service: Mr30searchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mr30searchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
