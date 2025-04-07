import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../../core/services/heroes.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockLocation: jasmine.SpyObj<Location>;

  const mockHero = {
    id: 1,
    name: 'Superman',
    biography: { fullName: 'Clark Kent', alignment: 'good' },
    connections: { groupAffiliation: 'Justice League' },
  };

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroById']);
    mockHeroService.getHeroById.and.returnValue(mockHero);

    mockLocation = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent, NoopAnimationsModule],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load hero', () => {
    expect(mockHeroService.getHeroById).toHaveBeenCalledWith(1);
    expect(component.hero).toEqual(mockHero);
  });

  it('should call location.back()', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
