import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersSayComponent } from './customers-say.component';

describe('CustomersSayComponent', () => {
  let component: CustomersSayComponent;
  let fixture: ComponentFixture<CustomersSayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersSayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersSayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
