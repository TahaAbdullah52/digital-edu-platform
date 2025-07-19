import { TestBed } from '@angular/core/testing';

import { QuizCreationService } from './quiz-creation.service';

describe('QuizCreationService', () => {
  let service: QuizCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
