import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoePhaseComponent } from './moe-phase.component';

describe('MoePhaseComponent', () => {
  let component: MoePhaseComponent;
  let fixture: ComponentFixture<MoePhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoePhaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
