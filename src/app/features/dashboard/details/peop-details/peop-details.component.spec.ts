import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopDetailsComponent } from './peop-details.component';

describe('PeopDetailsComponent', () => {
  let component: PeopDetailsComponent;
  let fixture: ComponentFixture<PeopDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
