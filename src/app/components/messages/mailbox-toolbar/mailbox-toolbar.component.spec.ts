import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxToolbarComponent } from './mailbox-toolbar.component';

describe('MailboxToolbarComponent', () => {
  let component: MailboxToolbarComponent;
  let fixture: ComponentFixture<MailboxToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailboxToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
