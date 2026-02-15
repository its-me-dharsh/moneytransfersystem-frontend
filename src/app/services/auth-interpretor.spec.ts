import { TestBed } from '@angular/core/testing';

import { AuthInterpretor } from './auth-interpretor';

describe('AuthInterpretor', () => {
  let service: AuthInterpretor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterpretor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
