import { TestBed } from '@angular/core/testing';

import { FirabaseService } from './firabase.service';

describe('FirabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirabaseService = TestBed.get(FirabaseService);
    expect(service).toBeTruthy();
  });
});
