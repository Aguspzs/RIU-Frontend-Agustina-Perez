import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlertComponent } from './delete-alert.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DeleteAlertComponent', () => {
  let component: DeleteAlertComponent;
  let fixture: ComponentFixture<DeleteAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAlertComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'Spider-Man' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
