import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => null }),
            snapshot: { paramMap: { get: () => null } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
