/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeroesServiceService } from './heroes.service';

describe('Service: HeroesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesServiceService],
    });
  });

  it('should ...', inject([HeroesServiceService], (service: HeroesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
