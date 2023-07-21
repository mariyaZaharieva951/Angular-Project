import { TestBed } from '@angular/core/testing';

import { StrollerServiceService } from './stroller-service.service';

describe('StrollerServiceService', () => {
  let service: StrollerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrollerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
