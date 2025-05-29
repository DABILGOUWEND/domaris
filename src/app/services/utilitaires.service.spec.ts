import { TestBed } from '@angular/core/testing';

import { UtilitairesService } from './utilitaires.service';

describe('UtilitairesService', () => {
  let service: UtilitairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
