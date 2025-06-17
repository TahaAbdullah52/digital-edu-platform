import { TestBed } from '@angular/core/testing';

import { CourseManagementService } from './course-management.service';

describe('CourseManagementService', () => {
  let service: CourseManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
