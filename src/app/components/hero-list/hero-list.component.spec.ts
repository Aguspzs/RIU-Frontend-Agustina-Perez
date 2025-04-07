import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { of } from 'rxjs';
import { HeroService } from '../../core/services/heroes.service';
import { Hero } from '../../core/models/hero.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  const mockHeroes: Hero[] = [
    {
      id: 1,
      name: 'Superman',
      biography: {
        fullName: 'Clark Kent',
        alignment: 'good',
        firstAppearance: 'Action Comics #1',
      },
      connections: {
        groupAffiliation: 'Justice League',
      },
    },
  ];

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['loadHeroes', 'deleteHero', 'searchHeroes', 'getHeroById', 'getHeroes']);
    mockHeroService.getHeroes.and.returnValue(of(mockHeroes));

    await TestBed.configureTestingModule({
      imports: [HeroListComponent, NoopAnimationsModule],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes list', () => {
    expect(component.heroes().length).toBe(1);
    expect(component.heroes()[0].name).toBe('Superman');
  });
});
