import { TestBed } from '@angular/core/testing';

import { RunewsService } from './runews.service';

describe('RunewsService', () => {
  let service: RunewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
