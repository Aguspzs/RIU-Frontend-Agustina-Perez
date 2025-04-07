import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './heroes.service';
import { API_CONFIG } from '../config/api.config';
import { Hero } from '../models/hero.model';
import { provideHttpClient, HttpClient } from '@angular/common/http';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  const mockHeroes: Hero[] = [
    {
      id: 1,
      name: 'Spider-Man',
      biography: { fullName: 'Peter Parker', alignment: 'good', firstAppearance: '1962' },
      connections: { groupAffiliation: 'Avengers' },
    },
    {
      id: 2,
      name: 'Iron Man',
      biography: { fullName: 'Tony Stark', alignment: 'good', firstAppearance: '1963' },
      connections: { groupAffiliation: 'Avengers' },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), HeroService],
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

  it('should load heroes when loadHeroes() is called', (done) => {
    service.loadHeroes();

    const req = httpMock.expectOne(API_CONFIG.HEROES_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);

    service.heroes$.subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
      done();
    });
  });

  it('should get hero by id', () => {
    service['heroes'].next(mockHeroes);
    const hero = service.getHeroById(1);
    expect(hero).toEqual(mockHeroes[0]);
  });

  it('should search heroes by name', () => {
    service['heroes'].next(mockHeroes);
    const result = service.searchHeroes('Iron Man');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Iron Man');
  });

  it('should add a new hero', (done) => {
    service['heroes'].next(mockHeroes);

    const newHero: Hero = {
      id: 0,
      name: 'Hulk',
      biography: { fullName: 'Bruce Banner', alignment: 'good', firstAppearance: '1962' },
      connections: { groupAffiliation: 'Avengers' },
    };

    service.addHero(newHero);

    service.heroes$.subscribe((heroes) => {
      expect(heroes.length).toBe(3);
      expect(heroes[2].name).toBe('Hulk');
      done();
    });
  });

  it('should update a hero', (done) => {
    service['heroes'].next(mockHeroes);

    const updatedHero = {
      ...mockHeroes[0],
      biography: { ...mockHeroes[0].biography, alignment: 'neutral' },
      connections: { groupAffiliation: 'None' },
    };

    service.updateHero(updatedHero);

    service.heroes$.subscribe((heroes) => {
      const hero = heroes.find((h) => h.id === updatedHero.id);
      expect(hero?.biography?.alignment).toBe('neutral');
      expect(hero?.connections?.groupAffiliation).toBe('None');
      done();
    });
  });

  it('should delete a hero', (done) => {
    service['heroes'].next(mockHeroes);

    service.deleteHero(1);

    service.heroes$.subscribe((heroes) => {
      expect(heroes.length).toBe(1);
      expect(heroes[0].id).toBe(2);
      done();
    });
  });
});
