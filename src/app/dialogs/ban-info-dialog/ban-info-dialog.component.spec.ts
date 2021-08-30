import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanInfoDialogComponent } from './ban-info-dialog.component';

describe('BanInfoDialogComponent', () => {
  let component: BanInfoDialogComponent;
  let fixture: ComponentFixture<BanInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
