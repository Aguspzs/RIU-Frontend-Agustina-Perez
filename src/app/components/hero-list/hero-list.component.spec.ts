import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { of } from 'rxjs';
import { HeroService } from '../../core/services/heroes.service';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getAllHeroes', 'searchHeroes', 'deleteHero']);
    mockHeroService.getHeroes.and.returnValue(of([{ id: 1, name: 'Superman' }]));

    await TestBed.configureTestingModule({
      imports: [HeroListComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar la lista de héroes al iniciar', () => {
    expect(component.heroes().length).toBe(1);
  });
});
