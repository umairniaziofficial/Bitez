import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetOurChefComponent } from './meet-our-chef.component';

describe('MeetOurChefComponent', () => {
  let component: MeetOurChefComponent;
  let fixture: ComponentFixture<MeetOurChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetOurChefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetOurChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
