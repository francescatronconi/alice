import { TestBed } from '@angular/core/testing';

import { HrefResolverService } from './href-resolver.service';

describe('HrefResolverService', () => {
  let service: HrefResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrefResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
