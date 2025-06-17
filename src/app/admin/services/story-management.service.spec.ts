import { TestBed } from '@angular/core/testing';

import { StoryManagementService } from './story-management.service';

describe('StoryManagementService', () => {
  let service: StoryManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
