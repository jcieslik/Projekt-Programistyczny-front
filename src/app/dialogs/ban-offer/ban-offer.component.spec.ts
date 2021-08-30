import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanOfferComponent } from './ban-offer.component';

describe('BanOfferComponent', () => {
  let component: BanOfferComponent;
  let fixture: ComponentFixture<BanOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
