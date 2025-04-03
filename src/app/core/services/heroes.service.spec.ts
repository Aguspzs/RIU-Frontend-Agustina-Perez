import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroService } from './heroes.service';
import { API_CONFIG } from '../config/api.config';
import { Hero } from '../models/hero.model';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), HeroService],
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load heroes on initialization', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Spider-Man', biography: { fullName: 'Peter Parker', alignment: 'good', firstAppearance: '1962' }, connections: { groupAffiliation: 'Avengers' } },
      { id: 2, name: 'Iron Man', biography: { fullName: 'Tony Stark', alignment: 'good', firstAppearance: '1963' }, connections: { groupAffiliation: 'Avengers' } },
    ];

    service.loadHeroes();
    const req = httpMock.expectOne(API_CONFIG.HEROES_URL);
    expect(req.request.method).toBe('GET');

    req.flush(mockHeroes);

    service.heroes$.subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });
  });

  it('should get heroes by id', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Spider-Man', biography: { fullName: 'Peter Parker', alignment: 'good', firstAppearance: '1962' }, connections: { groupAffiliation: 'Avengers' } },
      { id: 2, name: 'Iron Man', biography: { fullName: 'Tony Stark', alignment: 'good', firstAppearance: '1963' }, connections: { groupAffiliation: 'Avengers' } },
    ];

    service.loadHeroes();

    const hero = service.getHeroById(1);
    expect(hero).toEqual(mockHeroes[0]);
  });

  it('should search heroes by name', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Spider-Man', biography: { fullName: 'Peter Parker', alignment: 'good', firstAppearance: '1962' }, connections: { groupAffiliation: 'Avengers' } },
      { id: 2, name: 'Iron Man', biography: { fullName: 'Tony Stark', alignment: 'good', firstAppearance: '1963' }, connections: { groupAffiliation: 'Avengers' } },
    ];

    service.loadHeroes();

    const searchResult = service.searchHeroes('Iron Man');
    expect(searchResult.length).toBe(1);
    expect(searchResult[0].name).toBe('Iron Man');
  });

  it('should add a new hero', () => {
    const newHero: Hero = { id: 3, name: 'Hulk', biography: { fullName: 'Bruce Banner', alignment: 'good', firstAppearance: '1962' }, connections: { groupAffiliation: 'Avengers' } };

    service.addHero(newHero);

    service.heroes$.subscribe((heroes) => {
      expect(heroes.length).toBe(1);
      expect(heroes[0].name).toBe('Hulk');
    });
  });

  it('should update a hero', () => {
    const mockHeroes: Hero[] = [{ id: 1, name: 'Spider-Man', biography: { fullName: 'Peter Parker', alignment: 'good', firstAppearance: '1962' }, connections: { groupAffiliation: 'Avengers' } }];

    service.loadHeroes();
    const updatedHero: Hero = { id: 1, name: 'Spider-Man', biography: { fullName: 'Peter Parker', alignment: 'neutral', firstAppearance: '1962' }, connections: { groupAffiliation: 'None' } };

    service.updateHero(updatedHero);

    service.heroes$.subscribe((heroes) => {
      expect(heroes[0].biography?.alignment).toBe('neutral');
      expect(heroes[0].connections?.groupAffiliation).toBe('None');
    });
  });

  it('should delete a hero', () => {
    const mockHeroes: Hero[] = [{ id: 1, name: 'Spider-Man', biography: { fullName: 'Peter Parker', alignment: 'good', firstAppearance: '1962' }, connections: { groupAffiliation: 'Avengers' } }];

    service.loadHeroes();

    service.deleteHero(1);

    service.heroes$.subscribe((heroes) => {
      expect(heroes.length).toBe(0);
    });
  });
});
