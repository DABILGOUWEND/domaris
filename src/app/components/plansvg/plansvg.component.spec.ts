import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansvgComponent } from './plansvg.component';

describe('PlansvgComponent', () => {
  let component: PlansvgComponent;
  let fixture: ComponentFixture<PlansvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlansvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
