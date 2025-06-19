import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, Route } from '@angular/router';  // Import provideRouter and Route
import { userGuard } from './user.guard';  // Your userGuard file
import { UserService } from './services/user.service';  // Make sure to import UserService if it's used inside the guard
import { Observable, of } from 'rxjs';

// Mock UserService to control the isAuthenticated() response for testing
class MockUserService {
  isAuthenticated(): Observable<boolean> {
    return of(true);  // Simulate user being authenticated for this test
  }
}

describe('userGuard', () => {
  let guard: userGuard;  // The actual guard instance
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideRouter([  // Configure the router using provideRouter
          { path: 'home', component: class {} },  // A dummy component for testing
        ]),
      ],
      providers: [
        userGuard,
        { provide: UserService, useClass: MockUserService },  // Provide the mock UserService
      ]
    });

    guard = TestBed.inject(userGuard);  // Inject the userGuard instance
    userService = TestBed.inject(UserService);  // Inject the UserService
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();  // Ensure the guard is created successfully
  });

  it('should allow access if the user is authenticated', (done) => {
    spyOn(userService, 'isAuthenticated').and.returnValue(true);  // Ensure the user is authenticated

    // Test if the guard allows access (handle observable properly)
    const result = guard.canActivate(null as any, null as any);

    if (result instanceof Observable) {
      // If the result is an Observable, subscribe to it
      result.subscribe((res: boolean) => {
        expect(res).toBe(true);  // The guard should allow access (return true)
        done();  // Complete the async test
      });
    } else {
      // If the result is a boolean, check it directly
      expect(result).toBe(true);  // The guard should allow access (return true)
      done();  // Complete the async test
    }
  });

  it('should deny access if the user is not authenticated', (done) => {
    spyOn(userService, 'isAuthenticated').and.returnValue(false);  // Simulate user not being authenticated

    // Test if the guard denies access (handle observable properly)
    const result = guard.canActivate(null as any, null as any);

    if (result instanceof Observable) {
      // If the result is an Observable, subscribe to it
      result.subscribe((res: boolean) => {
        expect(res).toBe(false);  // The guard should deny access (return false)
        done();  // Complete the async test
      });
    } else {
      // If the result is a boolean, check it directly
      expect(result).toBe(false);  // The guard should deny access (return false)
      done();  // Complete the async test
    }
  });

  it('should handle synchronous boolean return value', () => {
    spyOn(userService, 'isAuthenticated').and.returnValue(false);  // Simulate user not being authenticated

    // Test the synchronous behavior (without subscription)
    const result = guard.canActivate(null as any, null as any);
    expect(result).toBe(false);  // Guard should return false directly
  });
});
