import { TestBed, inject } from '@angular/core/testing';

import { OccurenceService } from './occurence.service';

describe('OccurenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccurenceService]
    });
  });

  it('should be created', inject([OccurenceService], (service: OccurenceService) => {
    expect(service).toBeTruthy();
  }));
});
