import { TestBed } from '@angular/core/testing';

import { AcceptCookieService } from './accept-cookie.service';

describe('AcceptCookieService', () => {
  let service: AcceptCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
